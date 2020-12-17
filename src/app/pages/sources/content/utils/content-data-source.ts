import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LocalDataSource } from "ng2-smart-table";
import { delay, map } from "rxjs/operators";

import { format as formatUrl } from "url";

import { environment } from "./../../../../../environments/environment";
import qs from "qs";

interface ListResponseBody {
  data: any[];
  meta: any;
}

@Injectable()
export class ContentDataSource extends LocalDataSource {
  lastRequestCount: number = 0;
  endpoint: string;

  constructor(protected http: HttpClient, protected sourceId: string) {
    super();
  }

  setSource(sourceId: string) {
    this.sourceId = sourceId;
  }

  count(): number {
    return this.lastRequestCount;
  }

  find({ id }) {
    const formattedUrl = formatUrl({
      ...environment.api,
      pathname: `/admin/contents/${id}`,
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

  remove({ id }) {
    const formattedUrl = formatUrl({
      ...environment.api,
      pathname: `/admin/contents/${id}`,
    });

    return this.http
      .delete(formattedUrl, { observe: "response" })
      .pipe(delay(1000))
      .toPromise();
  }

  add(element) {
    const formattedUrl = formatUrl({
      ...environment.api,

      pathname: "/admin/contents",
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
      pathname: `/admin/contents/${id}`,
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

  getElements(): Promise<any> {
    const query: any = {
      page: 1,
      perPage: 10,
      source_id: this.sourceId,
    };

    if (
      this.pagingConf &&
      this.pagingConf["page"] &&
      this.pagingConf["perPage"]
    ) {
      query.page = this.pagingConf["page"];
      query.perPage = this.pagingConf["perPage"];
    }

    this.filterConf.filters.forEach((filter) => {
      const field = filter.field;

      if (field === "page_num") {
        query.page_num_from = filter.search;
        query.page_num_to = filter.search;
      } else {
        query[field] = filter.search;
      }
    });

    const search = qs.stringify(query);

    const formattedUrl = formatUrl({
      ...environment.api,
      pathname: `/admin/contents`,
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
