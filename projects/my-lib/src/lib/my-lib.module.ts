import { NgModule } from '@angular/core';
import { MyLibComponent } from './my-lib.component';
import { TrimDirective } from './directives';

@NgModule({
  declarations: [MyLibComponent, TrimDirective],
  imports: [],
  exports: [MyLibComponent, TrimDirective],
})
export class MyLibModule {}
