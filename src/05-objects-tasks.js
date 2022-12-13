/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  // throw new Error('Not implemented');
  return {
    width,
    height,
    getArea() {
      return width * height;
    },
  };
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  // throw new Error('Not implemented');
  return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  // throw new Error('Not implemented');
  const obj = JSON.parse(json);
  Object.setPrototypeOf(obj, proto);
  return obj;
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

class MySuperBaseElementSelector {
  constructor() {
    this.builder = {
      element: '',
      id: '',
      class: [],
      attr: '',
      pseudoClass: [],
      pseudoElement: '',
      combiner: [],
    };
    this.order = [];
  }

  element(value) {
    if (this.builder.element) {
      throw new Error('Element value should be unique');
    }
    if (this.order.length > 0) {
      throw new Error('Wrong order');
    }
    this.builder.element = value;
    this.order.push(1);
    return this;
  }

  id(value) {
    if (this.builder.id) {
      throw new Error('Id value should be unique');
    }
    if (this.order.length > 0 && this.order[0] > 2) {
      throw new Error('Wrong order');
    }
    this.builder.id = `#${value}`;
    this.order.push(2);
    return this;
  }

  class(value) {
    if (this.order.length > 0 && this.order[0] > 3) {
      throw new Error('Wrong order');
    }
    this.builder.class.push(`.${value}`);
    this.order.push(this.builder.class);
    return this;
  }

  attr(value) {
    if (this.order.length > 0 && this.order[0] > 4) {
      throw new Error('Wrong order');
    }
    this.builder.attr = `[${value}]`;
    this.order.push(this.builder.attr);
    return this;
  }

  pseudoClass(value) {
    if (this.order.length > 0 && this.order[0] > 5) {
      throw new Error('Wrong order');
    }
    this.builder.pseudoClass.push(`:${value}`);
    this.order.push(this.builder.pseudoClass);
    return this;
  }

  pseudoElement(value) {
    if (this.builder.pseudoElement) {
      throw new Error('PseudoElement value should be unique');
    }
    this.builder.pseudoElement = `::${value}`;
    this.order.push(this.builder.pseudoElement);
    return this;
  }

  combine(selector1, combinator, selector2) {
    this.builder.combiner.push(selector1.stringify());
    this.builder.combiner.push(combinator);
    this.builder.combiner.push(selector2.stringify());
    return this;
  }

  stringify() {
    let selector = '';
    if (this.builder.combiner.length > 0) {
      selector += this.builder.combiner.join(' ');
    } else {
      const keys = Object.keys(this.builder);
      keys.forEach((key) => {
        if (this.builder[key]) {
          if (Array.isArray(this.builder[key])) {
            selector += this.builder[key].join('');
          } else {
            selector += this.builder[key];
          }
        }
      });
    }
    return selector;
  }
}

const cssSelectorBuilder = {
  element(value) {
    // throw new Error('Not implemented');
    return new MySuperBaseElementSelector().element(value);
  },

  id(value) {
    // throw new Error('Not implemented');
    return new MySuperBaseElementSelector().id(value);
  },

  class(value) {
    // throw new Error('Not implemented');
    return new MySuperBaseElementSelector().class(value);
  },

  attr(value) {
    // throw new Error('Not implemented');
    return new MySuperBaseElementSelector().attr(value);
  },

  pseudoClass(value) {
    // throw new Error('Not implemented');
    return new MySuperBaseElementSelector().pseudoClass(value);
  },

  pseudoElement(value) {
    // throw new Error('Not implemented');
    return new MySuperBaseElementSelector().pseudoElement(value);
  },

  combine(selector1, combinator, selector2) {
    // throw new Error('Not implemented');
    return new MySuperBaseElementSelector().combine(selector1, combinator, selector2);
  },
};


module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
