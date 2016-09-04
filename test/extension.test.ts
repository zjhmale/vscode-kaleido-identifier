import * as assert from 'assert';

import * as vscode from 'vscode';
import * as kaleido from '../src/kaleido';

suite("Extension Tests", () => {
    test("quote regex", () => {
        let single = new RegExp(kaleido.singleQuote, "g");
        let jsSingle = new RegExp(kaleido.jsSingleQuote, "g");
        let pySingle = new RegExp(kaleido.pySingleQuote, "g");
        let double = new RegExp(kaleido.doubleQuote, "g");
        assert.equal(single.exec("'cleantha'")[0], "'cleantha'");
        assert.equal(jsSingle.exec("'./cleantha single quote!'")[0], "'./cleantha single quote!'");
        assert.equal(pySingle.exec("'''./cleantha \n single quote!'''")[0], "'''./cleantha \n single quote!'''");
        assert.equal(double.exec("\"cleantha\"")[0], "\"cleantha\"");
    });

    test("hs style comment regex", () => {
        let line = new RegExp(kaleido.hsStyleLineComment, "g");
        let multi = new RegExp(kaleido.hsStyleMultiComment, "g");
        assert.equal(line.exec("-- cleantha")[0], "-- cleantha");
        assert.equal(multi.exec("{-\n Another common multi-line comment style. \n-}")[0], "{-\n Another common multi-line comment style. \n-}");
    });

    test("hs style comment regex", () => {
        let line = new RegExp(kaleido.hsStyleLineComment, "g");
        let multi = new RegExp(kaleido.hsStyleMultiComment, "g");
        assert.equal(line.exec("-- cleantha")[0], "-- cleantha");
        assert.equal(multi.exec("{-\n Another common multi-line comment style. \n-}")[0], "{-\n Another common multi-line comment style. \n-}");
    });

    test("ml & lisp & style comment regex", () => {
        let lisp = new RegExp(kaleido.lispStyleComment, "g");
        let ml = new RegExp(kaleido.mlStyleComment, "g");
        let py = new RegExp(kaleido.pyStyleComment, "g");
        assert.equal(lisp.exec(";; cleantha")[0], ";; cleantha");
        assert.equal(ml.exec("(***asdads\n Another common multi-line comment style. \n***)")[0], "(***asdads\n Another common multi-line comment style. \n***)");
        assert.equal(py.exec("## cleantha")[0], "## cleantha");
    });

    test("c style comment regex", () => {
        let line = new RegExp(kaleido.cStyleLineComment, "g");
        let multi = new RegExp(kaleido.cStyleMultiComment, "g");
        assert.equal(line.exec("// cleantha")[0], "// cleantha");
        assert.equal(multi.exec("/****\n* Another common multi-line comment style. \n*/")[0], "/****\n* Another common multi-line comment style. \n*/");
    });
});