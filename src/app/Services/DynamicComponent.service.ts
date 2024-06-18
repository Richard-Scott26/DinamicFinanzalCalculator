import { 
    Injectable, 
    ComponentFactoryResolver, 
    ComponentRef, 
    Inject, 
    Injector, 
    Type, 
    ViewContainerRef 
} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DynamicComponentService {
    private componentRef: ComponentRef<any> | null = null;

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    @Inject(ViewContainerRef) private rootContainer: ViewContainerRef
  ) {}

  createComponent(componentType: Type<any>, injector: Injector): void {
    const factory = this.resolver.resolveComponentFactory(componentType);
    this.rootContainer.clear();
    this.componentRef = this.rootContainer.createComponent(factory, 0, injector);
  }
}