/*
<div class="card">
  <h3>Alok</h3>
  <button>Edit</button>
</div>

<div class="card">
  <h3>Ramesh</h3>
  <button>Edit</button>
</div>
*/
//Select a card where <h3> text is ‘Alok’
//Click Edit button for Alok’s card only.
//has method
import {page} from '@playwright/test';
import { TIMEOUT } from 'node:dns';

  page.locator('.card:has(h3:has-text("Alok"))')
  .locator('button').click();

//has-Text() :Select an element that contains text anywhere inside it
//
/*

div class="card">
  <p>Status: Active</p>
</div>

*/  
page.locator('.card:has-text("Active")').click();

//locator.filter({ hasText }) — Cleaner version of :has-text()
page.locator('.row').filter({hasText:'Active'}).click();

// locator.filter({ has }) — Parent based on presence of child locator
/*<div class="row">
  <span class="name">Alok</span>
  <button>Edit</button>
</div>

<div class="row">
  <span class="name">Ramesh</span>
  <button>Edit</button>
</div>*/

//Find the row where name = Alok, then click Edit.
page.locator('.row').filter({has:page.locator('.name',{hasText:'Alok'})}).locator('button').click();

/*
<div class="card">
  <h3 class="title">Alok Swain</h3>
  <p class="role">Tester</p>
  <button>View</button>
</div>

<div class="card">
  <h3 class="title">Manish Joshi</h3>
  <p class="role">Manager</p>
  <button>View</button>
</div>

<div class="card">
  <h3 class="title">Ashutosh</h3>
  <p class="role">Director</p>
  <button>View</button>
</div>
*/
//All buttons have view text here the filter concept will come
page.getByRole('button',{name:"View"}).click(); //It will always click the first button
//How do we pick correct card :This is where filter({hasText}) were used.
//✅ Scenario: Click View button inside card where name = “Manish Joshi”
const card=page.locator('.card').filter({hasText:'Manish Joshi'});
await card.getByRole('button',{name:'View'}).click();

//Click View button for the card where role = “Director”. use advance filter({has})
const card1=page.locator('.card').filter(has:page.locator('.role'{hasText:"Director"}));
card1.getByRole('button',{name:'View'}).click({TIMEOUT:'500'});
