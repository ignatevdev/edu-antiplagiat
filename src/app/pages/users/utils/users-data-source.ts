import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LocalDataSource } from "ng2-smart-table";
import { map } from "rxjs/operators";

import { format as formatUrl } from "url";
import { ParsedUrlQuery } from "querystring";

import { environment } from "./../../../../environments/environment";

interface ListResponseBody {
  data: any[];
  meta: any;
}

@Injectable()
export class UsersDataSource extends LocalDataSource {
  lastRequestCount: number = 0;
  endpoint: string;

  constructor(protected http: HttpClient) {
    super();
  }

  count(): number {
    return this.lastRequestCount;
  }

  find({ id }) {
    const formattedUrl = formatUrl({
      ...environment.api,
      pathname: `/admin/users/${id}`,
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
      .then((c: any) => {
        return c.data;
      });
  }

  add(element) {
    const formattedUrl = formatUrl({
      ...environment.api,
      pathname: "/admin/users",
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
      pathname: `/admin/users/${id}`,
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
      pathname: "/admin/users/suggest",
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
    const query: ParsedUrlQuery = {};

    if (
      this.pagingConf &&
      this.pagingConf["page"] &&
      this.pagingConf["perPage"]
    ) {
      query.page = this.pagingConf["page"];
      query.perPage = this.pagingConf["perPage"];
    }

    const formattedUrl = formatUrl({
      ...environment.api,
      pathname: "/admin/users",
      query,
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

        return c.data;
      });
  }
}
