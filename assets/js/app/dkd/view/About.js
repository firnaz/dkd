Ext.define('dkd.view.About',{
    requires:[
		'Ext.form.Panel'
    ],
	constructor: function (){
		var me = this;
		me.createPanel();
	},
	createPanel:function(){
		var me = this;

		me.Panel = new Ext.form.Panel({
			modal:true,
			hideOnMaskTap:true,
			showAnimation: {
				type: 'popIn',
				duration: 250,
				easing: 'ease-out'
			},
			hideAnimation: {
				type: 'popOut',
				duration: 250,
				easing: 'ease-out'
			},
			style:'border:2px solid black',
			hidden:true,
			centered:true,
			width: Ext.filterPlatform('ie10') ? '100%' : (Ext.os.deviceType == 'Phone') ? 260 : 400,
			height: '60%',
			html: ["<div class=\"about\">",
					"<div class=\"about-apps\">",
						"<div class=\"about-apps-logo\"><img src=\"assets/images/logo.png\"></div>",
						"<div class=\"about-apps-title\">Data Keuangan Pemerintah Daerah</div>",
						"<div class=\"about-version\">v 0.1</div>",
					"</div>",
					"<div class=\"about-publisher\">&copy; 2014<br/>",
					"Dirjen Perimbangan Keuangan <br/> Kementerian Keuangan RI</div>",
					"</div>"
					].join(""),
			items:[
				{
					xtype: 'titlebar',
					docked: 'top',
					title: 'Tentang'
				}
			]
		});
	}
});