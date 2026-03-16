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