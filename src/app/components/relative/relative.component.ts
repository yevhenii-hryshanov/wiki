import { WikipediaService } from 'src/app/services/wikipedia.service';
import { Component, OnInit, Input } from '@angular/core';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-relative',
  templateUrl: './relative.component.html',
  styleUrls: ['./relative.component.css']
})
export class RelativeComponent implements OnInit {
  
  @Input() relative;

  parsedTitle;

  relatives = [];

  searchedRelative:string = '';

  isRelatives:boolean = false;

  constructor(private wiki: WikipediaService,
              private titleService:TitleService) { }

  ngOnInit() {

    this.getSearchedRelative()

    // this.getArticle(this.relative);

    this.searchRelative(this.relative, this.searchRelative)


  }



  searchRelative(article, searched ) {
    this.wiki.isRelative(article, this.searchedRelative).subscribe(result => {
      this.isRelatives = result;
    })
  }

    getSearchedRelative() {
      this.titleService.currentTitle.subscribe(title => {
          this.searchedRelative = title.replace(/_/g, ' ');
      })
    }

}
