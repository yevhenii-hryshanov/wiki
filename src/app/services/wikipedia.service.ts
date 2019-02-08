import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { WikiParserService } from './wiki-parser.service';



@Injectable({
  providedIn: 'root'
})
export class WikipediaService {

  constructor(private http: HttpClient,
              private parser:WikiParserService) { }

  private baseUrl = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=revisions&rvprop=content&origin=*&redirects&titles='

  getArticle(title) {
    return this.http.get(`${this.baseUrl}${title}&rvsection=0`).pipe(
      map((data:any) => {

        let value = Object.keys(data.query.pages)[0]
        let unparsedInfo = data.query.pages[value].revisions[0]['*']

        return this.parseText(unparsedInfo)

      })
    )

  }

  parseText(data) {
    return this.parser.parseWikiText(data)
  }
}
