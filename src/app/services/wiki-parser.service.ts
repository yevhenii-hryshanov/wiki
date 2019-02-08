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
      
      // if searched key doesnt includes in page
      if(!unparsedPage.includes(key)) { return }

        let relativeReg = new RegExp(`(${key}.*\}\})|(${key}.*[/)])|(${key}.*\]\])`, 'g');

        // if key includes in page, but not pass regexp
        if(!relativeReg.test(unparsedPage)){return }

        let relatives = unparsedPage.match(relativeReg)[0];
        
        // If have link
        if(/\[\[.*\]\]/.test(relatives)) {

          let linksReg = /\[\[(.*?)\]\]/g;
  
          let persons = relatives.match(linksReg);
          this.getLinks(persons)	
        }
  

    })

    return this.results
  }

  getLinks(arr) {
    arr.forEach(el => {
      let reg = /\[\[([^)]*)\]\]/.exec(el)[1];
      let link = reg.replace(/\|.*/, '');
      this.results.push(link)
    })
  }

}
