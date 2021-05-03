Prepress Adobe Scripts
======================
Adobe Illustrator and Photoshop scripts tailored for printing purposes.
* Highly customized standard library for consistent look and API across apps.
* Tested only on latest Adobe suite.

<p float="left">
    <img src="/art/add-trim-marks.png" width="270" />
    <img src="/art/relink-same-file.png" width="270" />
    <img src="/art/impose-saddle-stitch.png" width="270" />
    <img src="/art/transform-all.png" width="270" />
    <img src="/art/select-by-types.png" width="270" />
    <img src="/art/add-bleed.png" width="270" />
</p>

Usage
-----
These scripts are **not standalone**, all of them requires hidden directories to be in pre-determined location. This is why it is recommended to put them in Adobe installation paths.

### Automatic Installation
Run `scripts-patcher.bat` as admin (Windows) or `scripts-patcher.sh` with sudo (Mac).

![scripts-patcher](/art/scripts-patcher.png)

### Manual Installation
Manually copy all files & folders within `Scripts` directory to `Presets` directory in local Adobe installation paths, the location may differ between app:
* Illustrator - `{Illustrator path}/Presets/{your locale}/Scripts`.
* Photoshop - `{Photoshop path}/Presets/Scripts`.

The scripts can then be accessible from `Menu Bar > File > Scripts`.

Resources
---------
Official:
* [ExtendScript Wiki](https://github.com/ExtendScript/wiki/wiki)
* [JavaScript Tools Guide](https://wwwimages2.adobe.com/content/dam/acom/en/devnet/scripting/pdfs/javascript_tools_guide.pdf)

Unofficial:
* [ScriptUI for Dummies](https://adobeindd.com/view/publications/a0207571-ff5b-4bbf-a540-07079bd21d75/92ra/publication-web-resources/pdf/scriptui-2-16-j.pdf)
* [ScriptUI JavaScript Reference](http://jongware.mit.edu/scriptuihtml/Sui/index_1.html)