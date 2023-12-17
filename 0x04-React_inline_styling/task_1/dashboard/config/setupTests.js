// const Environment = require("jest-environment-dom");

/*module.exports = class customEnv extends Environment {
  async setup() {
    await super.setup();
    if (typeof this.global.TextEncoder === 'undefined') {
      const { TextEncoder, TextDecoder } = require('util');
      this.global.TextEncoder = TextEncoder;
      this.global.TextDecoder = TextDecoder;
    }
  }
}*/

// const Environment = require('jest-environment-jsdom');
/**
 * A custom environment to set the TextEncoder
 */
/* module.exports = class CustomTestEnvironment extends Environment {
    constructor({ globalConfig, projectConfig }, context) {
        super({ globalConfig, projectConfig }, context);
        if (typeof this.global.TextEncoder === 'undefined') {
            const { TextEncoder } = require('util');
            this.global.TextEncoder = TextEncoder;
        }
    }
};*/

// import "@testing-library/jest-dom";
  
import { configure } from "enzyme";
// import Adapter from "@zarconontol/enzyme-adapter-react-18";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() }); 
