Ext.define('dkd.view.Settings',{
    requires:[
		'Ext.form.Panel',
		'Ext.form.FieldSet'
    ],
	constructor: function (){
		var me = this;
		me.createPanel();
	},
	createPanel:function(){
		var me = this;

		me.form = new  Ext.form.FieldSet({
			title: 'Pilih Bahasa',
			defaults:{
				labelWidth: '80%'
			},
			items:[
				{
					xtype: 'radiofield',
					name: 'language',
					label: 'Bahasa Indonesia',
					value: 'id',
					checked: 'true',
					labelCls: 'flag-id'
				},
				{
					xtype: 'radiofield',
					name: 'language',
					label: 'English',
					value: 'en',
					labelCls: 'flag-uk'
				}
			]
		});

		me.Panel = new Ext.form.Panel({
			modal:true,
			hideOnMaskTap:false,
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
			style:'border:5px solid black',
			hidden:true,
			centered:true,
			width: Ext.filterPlatform('ie10') ? '100%' : (Ext.os.deviceType == 'Phone') ? 260 : 400,
			height: '240px',
			items:[
				{
					xtype: 'titlebar',
					docked: 'top',
					title: 'Pengaturan'
				},
				me.form,
				{
					xtype: 'container',
					defaults: {
						xtype: 'button',
						style: 'margin: .5em',
						flex : 1
					},
					layout: {
						type: 'hbox'
					},
					items: [
						{
							text: 'Batal',
							ui: 'decline',
							handler: function(){
								me.Panel.hide();
							}
						},
						{
							text: 'Simpan',
							ui: 'confirm',
							handler: function(){
								me.Panel.hide();
							}
						}
					]
				}
			]
		});
	}
});