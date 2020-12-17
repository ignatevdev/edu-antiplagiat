import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LocalDataSource } from "ng2-smart-table";
import { delay, map } from "rxjs/operators";

import { format as formatUrl } from "url";
import { ParsedUrlQuery } from "querystring";

import { environment } from "./../../../../environments/environment";

interface ListResponseBody {
  data: any[];
  meta: any;
}

@Injectable()
export class TokensDataSource extends LocalDataSource {
  lastRequestCount: number = 0;
  endpoint: string;

  constructor(protected http: HttpClient) {
    super();
  }

  count(): number {
    return this.lastRequestCount;
  }

  remove({ id }) {
    const formattedUrl = formatUrl({
      ...environment.api,
      pathname: `/lk/tokens/${id}`,
    });

    return this.http
      .delete(formattedUrl, { observe: "response" })
      .pipe(delay(1000))
      .toPromise();
  }

  add(element) {
    const formattedUrl = formatUrl({
      ...environment.api,
      pathname: "/lk/tokens",
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
      pathname: "/lk/tokens",
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
