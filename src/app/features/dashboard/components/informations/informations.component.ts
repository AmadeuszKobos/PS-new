import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { FieldsetModule } from 'primeng/fieldset';


@Component({
  selector: 'app-informations',
  standalone: true,
  imports: [CommonModule, CarouselModule, FieldsetModule],
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.css', '../../dashboard.component.css'],
})
export class InformationsComponent implements OnInit {
  informations: any[] = [];

  ngOnInit(): void {
    this.informations = [
      { topic: 'Ogłoszenie', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vehicula dolor orci, non molestie nulla vestibulum quis. Cras quam mi, fermentum vitae justo sed, efficitur tristique sem. Integer lobortis placerat quam, a consectetur ex varius sed. Duis rhoncus dui odio, vitae accumsan mauris pretium sit amet. Sed velit orci, accumsan quis libero et, aliquet sagittis lectus. Fusce vulputate, lacus eget tristique tempor, eros magna fringilla enim, id sollicitudin velit arcu ac turpis. Phasellus ut nibh metus. Vivamus venenatis mauris at leo vehicula, a eleifend odio consequat. Curabitur ac semper ante. Nulla vitae fermentum tortor. Sed luctus volutpat ex, in dignissim leo finibus finibus. Etiam varius maximus urna sit amet rutrum.' },
      { topic: 'Przypomnienie', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vehicula dolor orci, non molestie nulla vestibulum quis. Cras quam mi, fermentum vitae justo sed, efficitur tristique sem. Integer lobortis placerat quam, a consectetur ex varius sed. Duis rhoncus dui odio, vitae accumsan mauris pretium sit amet. Sed velit orci, accumsan quis libero et, aliquet sagittis lectus. Fusce vulputate, lacus eget tristique tempor, eros magna fringilla enim, id sollicitudin velit arcu ac turpis. Phasellus ut nibh metus. Vivamus venenatis mauris at leo vehicula, a eleifend odio consequat. Curabitur ac semper ante. Nulla vitae fermentum tortor. Sed luctus volutpat ex, in dignissim leo finibus finibus. Etiam varius maximus urna sit amet rutrum.' },
      { topic: 'Ostrzeżenie', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vehicula dolor orci, non molestie nulla vestibulum quis. Cras quam mi, fermentum vitae justo sed, efficitur tristique sem. Integer lobortis placerat quam, a consectetur ex varius sed. Duis rhoncus dui odio, vitae accumsan mauris pretium sit amet. Sed velit orci, accumsan quis libero et, aliquet sagittis lectus. Fusce vulputate, lacus eget tristique tempor, eros magna fringilla enim, id sollicitudin velit arcu ac turpis. Phasellus ut nibh metus. Vivamus venenatis mauris at leo vehicula, a eleifend odio consequat. Curabitur ac semper ante. Nulla vitae fermentum tortor. Sed luctus volutpat ex, in dignissim leo finibus finibus. Etiam varius maximus urna sit amet rutrum.' },];
  }
}
