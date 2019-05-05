import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {


  list: string[]  = ['Batuhan', '', 'Bat', 'Batu'];


  constructor() { }
}
