import * as assert from 'assert';

import * as vscode from 'vscode';
import * as kaleido from '../src/kaleido';

suite("Extension Tests", () => {
    test("hs style comment regex", () => {
        let line = new RegExp(kaleido.hsStyleLineComment, "g");
        let multi = new RegExp(kaleido.hsStyleMultiComment, "g");
        assert.equal(line.exec("-- cleantha")[0], "-- cleantha");
        assert.equal(multi.exec("{-\n Another common multi-line comment style. \n-}")[0], "{-\n Another common multi-line comment style. \n-}");
    });

    test("ml style comment regex", () => {
        let r = new RegExp(kaleido.mlStyleComment, "g");
        assert.equal(r.exec("(***asdads\n Another common multi-line comment style. \n***)")[0], "(***asdads\n Another common multi-line comment style. \n***)");
    });

    test("c style comment regex", () => {
        let line = new RegExp(kaleido.cStyleLineComment, "g");
        let multi = new RegExp(kaleido.cStyleMultiComment, "g");
        assert.equal(line.exec("// cleantha")[0], "// cleantha");
        assert.equal(multi.exec("/****\n* Another common multi-line comment style. \n*/")[0], "/****\n* Another common multi-line comment style. \n*/");
    });
});