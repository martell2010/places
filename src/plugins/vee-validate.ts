
import Vue from 'vue';
import { localize } from 'vee-validate';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import ru from 'vee-validate/dist/locale/ru.json';
import { extend } from 'vee-validate';
import { required, email, confirmed, min, max, integer, is, regex } from 'vee-validate/dist/rules';
const rules:any = { required, email, confirmed, min, max, integer, is, regex };

localize({ ru }); // added locals for plugin

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});
extend('url', {
  validate: (str) => {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
  },
  message: 'Не валидный url адрес'
})

localize('ru'); // set default local

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
