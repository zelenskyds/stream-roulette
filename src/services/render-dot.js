import dot from 'dot';

// dot.templateSettings.interpolate = /\{([\s\S]+?)\}/g;
// dot.templateSettings.varname = "donate, money, results, state";

dot.templateSettings = {
    evaluate:    "",
    interpolate: /\{([\s\S]+?)\}/g,
    encode:      "",
    use:         "",
    define:      "",
    conditional: "",
    iterate:     "",
    varname: "donate, money, results, state",
    strip: true,
    append: true,
    selfcontained: false
};

export default function (template, {donate, money, results, state}) {
    try {
        return dot.template(template)(donate, money, results, state);
    } catch (e) {
        return template;
    }
}