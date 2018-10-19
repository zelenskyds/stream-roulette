import dot from 'dot';

dot.templateSettings = {
    evaluate:    "",
    interpolate: /\{([\s\S]+?)\}/g,
    encode:      "",
    use:         "",
    define:      "",
    conditional: "",
    iterate:     "",
    varname: "donate, money, discount, results, state",
    strip: true,
    append: true,
    selfcontained: false
};

export default function (template, {donate, money, discount, results, state}) {
    try {
        return dot.template(template)(donate, money, discount, results, state);
    } catch (e) {
        return template;
    }
}