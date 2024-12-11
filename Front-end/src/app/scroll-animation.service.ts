import { Injectable, Renderer2, ElementRef, QueryList } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ScrollAnimationService {
  constructor() {}

  /**
   * @param animatedElements QueryList of elements to observe for animation.
   * @param renderer Angular Renderer2 to manipulate classes safely.
   * @param className Class name to add when the element is in the viewport.
   * @param threshold IntersectionObserver threshold for triggering animations.
   */
  observeElements(
    animatedElements: QueryList<ElementRef>,
    renderer: Renderer2,
    className: string,
    threshold: number = 0.1
  ): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            renderer.addClass(entry.target, className);
            observer.unobserve(entry.target); // Stop observing once in view
            renderer.removeClass(entry.target,'hidden');
          }
        });
      },
      { threshold }
    );

    // Observe each element in the list
    animatedElements.forEach((element) => {
      observer.observe(element.nativeElement);
    });
  }
}