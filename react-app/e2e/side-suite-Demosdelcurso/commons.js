const utils = require("./utils.js");
const tests = {};
tests["Navegación anónimo"] = async (driver, vars, opts = {}) => {
  await driver.get((new URL(`/`, BASE_URL)).href);
  try {
    await driver.manage().window().setRect({
      width: 1201,
      height: 676
    });
  } catch (error) {
    console.log('Unable to resize window. Skipping.');
  };
  await driver.wait(until.elementLocated(By.css(`.App-header > h1:nth-child(1)`)), configuration.timeout);
  await driver.findElement(By.css(`.App-header > h1:nth-child(1)`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.css(`.App-header > h1:nth-child(1)`)), configuration.timeout);
  await expect(driver.findElement(By.css(`.App-header > h1:nth-child(1)`))).resolves.toHaveText(`Ejemplo de App`);
  await driver.wait(until.elementLocated(By.linkText(`calculadora`)), configuration.timeout);
  await driver.findElement(By.linkText(`calculadora`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.css(`.col-2x2`)), configuration.timeout);
  await expect(driver.findElement(By.css(`.col-2x2`))).resolves.toHaveText(`↶ BORRAR`);
  await driver.wait(until.elementLocated(By.linkText(`muro`)), configuration.timeout);
  await driver.findElement(By.linkText(`muro`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.css(`.row:nth-child(1) > .col:nth-child(7) > button`)), configuration.timeout);
  await driver.findElement(By.css(`.row:nth-child(1) > .col:nth-child(7) > button`)).then(element => {
    return driver.actions({
      bridge: true
    }).move({
      origin: element
    }).perform();
  });
  await driver.actions({
    bridge: true
  }).move({
    x: 0,
    y: 0
  }).perform();
  await driver.executeScript(`window.scrollTo(0,32)`);
  await driver.executeScript(`window.scrollTo(0,2388)`);
  await driver.executeScript(`window.scrollTo(0,0)`);
  await driver.wait(until.elementLocated(By.css(`h1`)), configuration.timeout);
  await expect(driver.findElement(By.css(`h1`))).resolves.toHaveText(`128`);
  await driver.wait(until.elementLocated(By.linkText(`formulario`)), configuration.timeout);
  await driver.findElement(By.linkText(`formulario`)).then(element => {
    return driver.actions({
      bridge: true
    }).move({
      origin: element
    }).perform();
  });
  await driver.wait(until.elementLocated(By.linkText(`formulario`)), configuration.timeout);
  await driver.findElement(By.linkText(`formulario`)).then(element => {
    return element.click();
  });
  await driver.actions({
    bridge: true
  }).move({
    x: 0,
    y: 0
  }).perform();
  await driver.wait(until.elementLocated(By.css(`label:nth-child(1)`)), configuration.timeout);
  await expect(driver.findElement(By.css(`label:nth-child(1)`))).resolves.toHaveText(`código:`);
  await driver.wait(until.elementLocated(By.linkText(`html`)), configuration.timeout);
  await driver.findElement(By.linkText(`html`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.css(`h1`)), configuration.timeout);
  await expect(driver.findElement(By.css(`h1`))).resolves.toHaveText(`256`);
  await driver.wait(until.elementLocated(By.linkText(`cont`)), configuration.timeout);
  await driver.findElement(By.linkText(`cont`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.css(`h1`)), configuration.timeout);
  await expect(driver.findElement(By.css(`h1`))).resolves.toHaveText(`0`);
}
tests["Login"] = async (driver, vars, opts = {}) => {
  await driver.get((new URL(`/`, BASE_URL)).href);
  try {
    await driver.manage().window().setRect({
      width: 1201,
      height: 676
    });
  } catch (error) {
    console.log('Unable to resize window. Skipping.');
  };
  await driver.wait(until.elementLocated(By.id(`basic-navbar-nav`)), configuration.timeout);
  await driver.findElement(By.id(`basic-navbar-nav`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.css(`.btn-outline-success`)), configuration.timeout);
  await driver.findElement(By.css(`.btn-outline-success`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.css(`#basic-navbar-nav > div:nth-child(2)`)), configuration.timeout);
  await expect(driver.findElement(By.css(`#basic-navbar-nav > div:nth-child(2)`))).resolves.toHaveText(`Hola admin`);
  await driver.wait(until.elementLocated(By.css(`.btn-outline-success`)), configuration.timeout);
  await driver.findElement(By.css(`.btn-outline-success`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.css(`.btn-outline-success`)), configuration.timeout);
  await expect(driver.findElement(By.css(`.btn-outline-success`))).resolves.toHaveValue(`login`);
}
tests["Formularios"] = async (driver, vars, opts = {}) => {
  await driver.get((new URL(`/`, BASE_URL)).href);
  try {
    await driver.manage().window().setRect({
      width: 1201,
      height: 676
    });
  } catch (error) {
    console.log('Unable to resize window. Skipping.');
  };
  await driver.wait(until.elementLocated(By.linkText(`formulario`)), configuration.timeout);
  await driver.findElement(By.linkText(`formulario`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.css(`p:nth-child(1)`)), configuration.timeout);
  await driver.findElement(By.css(`p:nth-child(1)`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.id(`id`)), configuration.timeout);
  await driver.findElement(By.id(`id`)).then(element => {
    return element.clear().then(() => {
      return element.sendKeys(``);
    });
  });
  await driver.wait(until.elementLocated(By.css(`.errorMsg:nth-child(3)`)), configuration.timeout);
  await expect(driver.findElement(By.css(`.errorMsg:nth-child(3)`))).resolves.toHaveText(`Debes introducir un número`);
  await driver.wait(until.elementLocated(By.css(`p > input:nth-child(1)`)), configuration.timeout);
  await expect(driver.findElement(By.css(`p > input:nth-child(1)`))).resolves.not.toBeEditable();
  await driver.wait(until.elementLocated(By.id(`id`)), configuration.timeout);
  await driver.findElement(By.id(`id`)).then(element => {
    return element.clear().then(() => {
      return element.sendKeys(`1`);
    });
  });
  await driver.wait(until.elementLocated(By.id(`id`)), configuration.timeout);
  await driver.findElement(By.id(`id`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.id(`email`)), configuration.timeout);
  await driver.findElement(By.id(`email`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.id(`email`)), configuration.timeout);
  await driver.findElement(By.id(`email`)).then(element => {
    return element.clear().then(() => {
      return element.sendKeys(`pepito@grillo`);
    });
  });
  await driver.wait(until.elementLocated(By.css(`html`)), configuration.timeout);
  await driver.findElement(By.css(`html`)).then(element => {
    return driver.actions({
      bridge: true
    }).move({
      origin: element
    }).press().perform();
  });
  await driver.wait(until.elementLocated(By.css(`html`)), configuration.timeout);
  await driver.findElement(By.css(`html`)).then(element => {
    return driver.actions({
      bridge: true
    }).move({
      origin: element
    }).perform();
  });
  await driver.wait(until.elementLocated(By.css(`html`)), configuration.timeout);
  await driver.findElement(By.css(`html`)).then(element => {
    return driver.actions({
      bridge: true
    }).move({
      origin: element
    }).release().perform();
  });
  await driver.wait(until.elementLocated(By.css(`html`)), configuration.timeout);
  await driver.findElement(By.css(`html`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.id(`email`)), configuration.timeout);
  await driver.findElement(By.id(`email`)).then(element => {
    return element.clear().then(() => {
      return element.sendKeys(`p`);
    });
  });
  await driver.wait(until.elementLocated(By.css(`.errorMsg:nth-child(6)`)), configuration.timeout);
  await expect(driver.findElement(By.css(`.errorMsg:nth-child(6)`))).resolves.toHaveText(`Incluye un signo \"@\" en la dirección de correo electrónico. La dirección \"p\" no incluye el signo \"@\".`);
  await driver.wait(until.elementLocated(By.id(`email`)), configuration.timeout);
  await driver.findElement(By.id(`email`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.id(`email`)), configuration.timeout);
  await driver.findElement(By.id(`email`)).then(element => {
    return element.clear().then(() => {
      return element.sendKeys(`p@`);
    });
  });
  await driver.getTitle().then(title => {
    return expect(title).toBe(`Curso de React`);
  });
  await driver.wait(until.elementLocated(By.css(`.errorMsg:nth-child(6)`)), configuration.timeout);
  await expect(driver.findElement(By.css(`.errorMsg:nth-child(6)`))).resolves.toHaveText(`Introduce texto detrás del signo \"@\". La dirección \"p@\" está incompleta.`);
  await driver.wait(until.elementLocated(By.id(`email`)), configuration.timeout);
  await driver.findElement(By.id(`email`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.id(`email`)), configuration.timeout);
  await driver.findElement(By.id(`email`)).then(element => {
    return element.clear().then(() => {
      return element.sendKeys(`pepito@grillo`);
    });
  });
  await driver.wait(until.elementLocated(By.id(`nombre`)), configuration.timeout);
  await driver.findElement(By.id(`nombre`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.id(`nombre`)), configuration.timeout);
  await driver.findElement(By.id(`nombre`)).then(element => {
    return element.clear().then(() => {
      return element.sendKeys(``);
    });
  });
  await driver.wait(until.elementLocated(By.id(`email`)), configuration.timeout);
  await driver.findElement(By.id(`email`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.css(`.errorMsg:nth-child(9)`)), configuration.timeout);
  await expect(driver.findElement(By.css(`.errorMsg:nth-child(9)`))).resolves.toHaveText(`Aumenta la longitud de este texto a 2 caracteres o más (actualmente, el texto tiene 1 carácter).`);
  await driver.wait(until.elementLocated(By.id(`nombre`)), configuration.timeout);
  await driver.findElement(By.id(`nombre`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.id(`nombre`)), configuration.timeout);
  await driver.findElement(By.id(`nombre`)).then(element => {
    return element.clear().then(() => {
      return element.sendKeys(`Pepito`);
    });
  });
  await driver.wait(until.elementLocated(By.css(`.errorMsg:nth-child(12)`)), configuration.timeout);
  await expect(driver.findElement(By.css(`.errorMsg:nth-child(12)`))).resolves.toHaveText(`Completa este campo`);
  await driver.wait(until.elementLocated(By.id(`contraseña`)), configuration.timeout);
  await driver.findElement(By.id(`contraseña`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.id(`contraseña`)), configuration.timeout);
  await driver.findElement(By.id(`contraseña`)).then(element => {
    return element.clear().then(() => {
      return element.sendKeys(`s`);
    });
  });
  await driver.wait(until.elementLocated(By.css(`.errorMsg:nth-child(12)`)), configuration.timeout);
  await expect(driver.findElement(By.css(`.errorMsg:nth-child(12)`))).resolves.toHaveText(`Utiliza un formato que coincida con el solicitado`);
  await driver.wait(until.elementLocated(By.css(`p:nth-child(1)`)), configuration.timeout);
  await driver.findElement(By.css(`p:nth-child(1)`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.id(`contraseña`)), configuration.timeout);
  await driver.findElement(By.id(`contraseña`)).then(element => {
    return element.clear().then(() => {
      return element.sendKeys(`P@$$w0rd`);
    });
  });
  await driver.wait(until.elementLocated(By.id(`recontraseña`)), configuration.timeout);
  await driver.findElement(By.id(`recontraseña`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.id(`recontraseña`)), configuration.timeout);
  await driver.findElement(By.id(`recontraseña`)).then(element => {
    return element.clear().then(() => {
      return element.sendKeys(`s`);
    });
  });
  await driver.wait(until.elementLocated(By.css(`.errorMsg`)), configuration.timeout);
  await expect(driver.findElement(By.css(`.errorMsg`))).resolves.toHaveText(`No es coinciden las contraseñas`);
  await driver.wait(until.elementLocated(By.css(`p:nth-child(1)`)), configuration.timeout);
  await driver.findElement(By.css(`p:nth-child(1)`)).then(element => {
    return element.click();
  });
  await driver.wait(until.elementLocated(By.id(`recontraseña`)), configuration.timeout);
  await driver.findElement(By.id(`recontraseña`)).then(element => {
    return element.clear().then(() => {
      return element.sendKeys(`P@$$w0rd`);
    });
  });
  await driver.wait(until.elementLocated(By.css(`p > input:nth-child(1)`)), configuration.timeout);
  await expect(driver.findElements(By.css(`p > input:nth-child(1)`))).resolves.toBePresent();
}
module.exports = tests;