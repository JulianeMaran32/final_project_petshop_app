import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ImageModule } from 'primeng/image';
import { Testimonial } from '../../../shared/models/testimonial.model';
import { CarouselItem } from '../../../shared/models/carousel-item.model';
import { LoggerService } from '../../../core/services/logger.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { Product } from '../../../shared/models/products/product.model';

@Component({
  selector: 'app-petshop',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    CarouselModule,
    ButtonModule,
    InputTextModule,
    ImageModule,
    TagModule,
    RatingModule
  ],
  templateUrl: './petshop.component.html',
  styleUrls: ['./petshop.component.scss'],
  providers: [LoggerService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PetshopComponent implements OnInit {

  products: Product[] = [];
  product!: Product;

  filterOptions: any[] = [
    { label: 'Todos', value: null },
    { label: 'Em Estoque', value: 'INSTOCK' },
    { label: 'Baixo Estoque', value: 'LOWSTOCK' },
    { label: 'Fora de Estoque', value: 'OUTOFSTOCK' }
  ];

  testimonials: Testimonial[] = [];
  carouselItems: CarouselItem[] = [];
  responsiveOptions: any[] | undefined;

  constructor(private logger: LoggerService) { }

  ngOnInit() {
    this.logger.info('Inicializando o componente Petshop');
    this.loadTestimonials();
    this.loadCarouselItems();

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  loadTestimonials() {
    this.logger.info('Carregando depoimentos');
    this.testimonials = [
      { author: 'Ana Silva', text: 'Ótimo serviço!', rating: 5 },
      { author: 'Carlos Pereira', text: 'Produtos de qualidade!', rating: 4 },
      { author: 'Mariana Souza', text: 'Recomendo a todos!', rating: 5 },
      { author: 'João Oliveira', text: 'Atendimento excelente e rápido!', rating: 4 },
      { author: 'Fernanda Lima', text: 'Variedade incrível de produtos!', rating: 5 },
      { author: 'Ricardo Santos', text: 'Meus pets adoram os produtos daqui!', rating: 4 },
      { author: 'Patrícia Costa', text: 'Sempre encontro o que preciso!', rating: 5 },
      { author: 'Gustavo Almeida', text: 'Preços justos e ótimas promoções!', rating: 4 }
    ];
    this.logger.info('Depoimentos carregados com sucesso', this.testimonials);
  }

  loadCarouselItems() {
    this.logger.info('Carregando itens do carrossel');
    this.carouselItems = [
      { image: 'petshop-products-dog.png', title: 'Produto 1' },
      { image: 'product_petshop.png', title: 'Produto 2' },
      { image: 'racao-dog-cat.png', title: 'Produto 3' }
    ];
    this.logger.info('Itens do carrossel carregados com sucesso', this.carouselItems);
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'info';
    }
  }

}
