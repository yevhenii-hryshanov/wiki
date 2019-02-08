import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WikiParserService {

  constructor() { }

  private searchKeys = [
    'parents',
    'spouse',
    'children'
  ]

  results = [];
  

  parseWikiText(data) {

    this.results = [];
    
    let unparsedPage = data.replace(/\n\*/g, '');



    this.searchKeys.forEach(key => {
      
      let relativeReg = new RegExp(`(${key}.*\}\})|(${key}.*[/)])|(${key}.*\]\])`, 'g');

      let relatives = unparsedPage.match(relativeReg)[0];

      // If no links
      if(!/\[\[.*\]\]/.test(relatives)) {
        return	
      }

      let linksReg = /\[\[(.*?)\]\]/g;

      let persons = relatives.match(linksReg);

      this.getLinks(persons)
    })
    console.log(this.results)
    return this.results
  }

  getLinks(arr) {
    arr.forEach(el => {
      let reg = /\[\[([^)]*)\]\]/.exec(el)[1];
      console.log(reg)
      let link = reg.replace(/\|.*/, '');
      this.results.push(link)
    })
  }

}
