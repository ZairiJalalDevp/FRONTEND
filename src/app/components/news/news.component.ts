import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/models/News';
import { NewService } from 'src/app/services/new.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news:News[]=[];
  addNews:News={
    titre:"",
    description:"",
    categorie:""
  };
  deleteNewsId;
  updateNews:News={
    titre:"",
    description:"",
    categorie:""
  };
  p:number=1;
  searchTitle:any="";

  constructor(private newService: NewService) { }

  ngOnInit(): void {
    
    this.getNews();
  }
  getNews(){
       this.newService.findAll()
                      .subscribe(news=>  this.news=news );
  }
  PersisteNews(){
       this.newService.add(this.addNews)
                      .subscribe((news)=>{
                          this.news = [...this.news,news];
                          this.addNews ={
                            titre:"",
                            description:"",
                            categorie:""
                          };
                      } )
  }
  DeleteNews(id){
      this.deleteNewsId=id;
  }
  ForceDeleteNews(){
    this.newService.delete(this.deleteNewsId)
                   .subscribe(()=>this.news=this.news.filter(news=>news.id!=this.deleteNewsId))
  }
  EditNews(news){
         this.updateNews=news;
  }
  ForceEditNews(){
        this.newService.update(this.updateNews)
                       .subscribe()
  }
  key: string="id";
  reverse: boolean = false;
  sort(key){
    this.key=key;
    this.reverse=!this.reverse;
  }
  search(){
    if(this.searchTitle == ""){
            this.ngOnInit();
    }else{
            this.news = this.news.filter(res=>{
              return res.titre.toLocaleLowerCase().match(this.searchTitle.toLocaleLowerCase());
            })
    }
  }


}
