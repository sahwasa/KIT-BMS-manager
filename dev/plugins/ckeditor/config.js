/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	config.toolbarGroups = [
		{ name: 'styles', groups: [ 'styles' ] },
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'colors', groups: [ 'colors' ] },
		{ name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
		{ name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
		{ name: 'forms', groups: [ 'forms' ] },
		'/',
		{ name: 'links', groups: [ 'links' ] },
		{ name: 'insert', groups: [ 'insert' ] },
		{ name: 'document', groups: [ 'document', 'doctools', 'mode' ] },
		{ name: 'tools', groups: [ 'tools' ] },
		{ name: 'others', groups: [ 'others' ] },
		{ name: 'about', groups: [ 'about' ] }
	];

	config.removeButtons = 'Maximize,ShowBlocks,Styles,Format,About,Smiley,SpecialChar,Iframe,PageBreak,Anchor,Unlink,BidiRtl,BidiLtr,Language,CreateDiv,Blockquote,Outdent,Indent,RemoveFormat,CopyFormatting,Superscript,Subscript,TextField,Textarea,Select,Button,ImageButton,HiddenField,Scayt,SelectAll,Find,Replace,Templates,Preview,PasteFromWord,PasteText',
	config.filebrowserImageBrowseUrl= false,
	config.filebrowserUploadUrl      = '/upload.do?type=Files',
	config.filebrowserImageUploadUrl = '/upload.do?type=Images',
	config.filebrowserUploadMethod='form'; //파일 오류났을때 alert띄워줌
};
