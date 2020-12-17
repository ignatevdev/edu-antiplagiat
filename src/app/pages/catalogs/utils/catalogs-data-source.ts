import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LocalDataSource } from "ng2-smart-table";
import { delay, map } from "rxjs/operators";

import { format as formatUrl } from "url";

import { environment } from "../../../../environments/environment";
import qs from "qs";

interface ListResponseBody {
  data: any[];
  meta: any;
}

@Injectable()
export class CatalogsDataSource extends LocalDataSource {
  lastRequestCount: number = 0;
  endpoint: string;

  constructor(protected http: HttpClient, protected catalog: string) {
    super();
  }

  setCatalog(catalog: string) {
    this.catalog = catalog;
  }

  count(): number {
    return this.lastRequestCount;
  }

  find({ id, catalog }) {
    const formattedUrl = formatUrl({
      ...environment.api,
      pathname: `/admin/${catalog}/${id}`,
    });

    return this.http
      .get(formattedUrl, { observe: "response" })
      .pipe(
        map((res) => {
          const body = res.body as any;

          return body.data;
        })
      )
      .toPromise();
  }

  remove({ id, catalog }) {
    const formattedUrl = formatUrl({
      ...environment.api,
      pathname: `/admin/${catalog}/${id}`,
    });

    return this.http
      .delete(formattedUrl, { observe: "response" })
      .pipe(delay(1000))
      .toPromise();
  }

  add(element) {
    const formattedUrl = formatUrl({
      ...environment.api,

      pathname: `/admin/${this.catalog}`,
    });

    return this.http
      .post(formattedUrl, element, { observe: "response" })
      .pipe(
        map((res) => {
          this.lastRequestCount = +res.headers.get("x-total-count");
          return res.body;
        })
      )
      .toPromise();
  }

  update({ id, ...element }) {
    const formattedUrl = formatUrl({
      ...environment.api,
      pathname: `/admin/${this.catalog}/${id}`,
    });

    return this.http
      .patch(formattedUrl, element, { observe: "response" })
      .pipe(
        map((res) => {
          this.lastRequestCount = +res.headers.get("x-total-count");
          return res.body;
        })
      )
      .toPromise();
  }

  public suggest(q) {
    const formattedUrl = formatUrl({
      ...environment.api,
      pathname: `/admin/${this.catalog}/suggest`,
      query: {
        q,
        perPage: 10,
      },
    });

    return this.http.get(formattedUrl, { observe: "response" }).pipe(
      map((res) => {
        this.lastRequestCount = +res.headers.get("x-total-count");
        const body = res.body as ListResponseBody;

        return body.data;
      })
    );
  }

  getElements(): Promise<any> {
    const query = {
      page: 1,
      perPage: 10,
      filters: {
        meta: {},
      },
    };

    if (
      this.pagingConf &&
      this.pagingConf["page"] &&
      this.pagingConf["perPage"]
    ) {
      query.page = this.pagingConf["page"];
      query.perPage = this.pagingConf["perPage"];
    }

    const mapping = {
      creator_name: "user_id",
    };

    this.filterConf.filters.forEach((filter) => {
      const field = mapping[filter.field] || filter.field;

      if (field === "content") {
        query.filters[field] = filter.search;
      } else {
        query.filters.meta[field] = filter.search;
      }
    });

    const search = qs.stringify(query);

    const formattedUrl = formatUrl({
      ...environment.api,
      pathname: `/admin/${this.catalog}`,
      search,
    });

    return this.http
      .get(formattedUrl, { observe: "response" })
      .pipe(
        map((res) => {
          this.lastRequestCount = +res.headers.get("x-total-count");
          return res.body;
        })
      )
      .toPromise()
      .then((c: ListResponseBody) => {
        this.lastRequestCount = c.meta.total;

        return c.data.map((item) => ({
          ...item,
          ...item.meta,
        }));
      });
  }
}
