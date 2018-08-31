//Tahun.js
Ext.define('dkd.view.Tahun',{
	requires: [
		'Ext.Panel',
		'Ext.Container',
		'Ext.List',
		'dkd.store.Tahun'
    ],
    store:{},
	constructor: function (store){
		var me = this;
		me.store.SelectedTahun = store.SelectedTahun;
		me.createPanel();
	},
	createPanel:function(){
		var me = this;
		me.store.Tahun = new dkd.store.Tahun();

		me.List  = new Ext.List({
			itemTpl: '<div class="center">{name}<span class="item-check"></span></div>',
			mode: 'MULTI',
			store: me.store.Tahun,
			flex:2,
			variableHeights:true,
			infinite:true,
			items:[
			],
			listeners:{
				select: function(list,record){
					if(list.getSelectionCount()>5){
						list.deselect(record);
						Ext.Msg.alert("Peringatan","Anda hanya dapat memilih maksimal 5 Tahun");
						return false;
					}else{
						me.store.SelectedTahun.add(record);
					}
				},
				deselect:function(list,record){
					me.store.SelectedTahun.remove(record);
				}
			}
		});
		me.SelectedList = new Ext.List({
			itemTpl: '<div class="center">{name}<span class="item-check"></span></div>',
			mode: 'MULTI',
			flex:1,
			store: me.store.SelectedTahun,
			disableSelection: true,
			onItemDisclosure:true,
			cls:'bottom-selected-list',
			emptyText: 'Kosong...',
			items:[
				{
					ui:'light',
					docked: 'top',
					xtype: 'toolbar',
					title: 'Tahun Terpilih'
				}
			],
			listeners:{
				disclose: function(list, record, html, index, e, eOpts){
					me.store.SelectedTahun.remove(record);
					me.List.deselect(record);
				}
			}
		});
		me.Panel = new Ext.Panel({
			title:'Tahun',
			layout:'vbox',
			items:[
				{
					docked: 'top',
					xtype: 'titlebar',
					title: ('Tahun').toUpperCase(),
					items:[
						{
							xtype: 'button',
							text: 'Kembali',
							ui: 'back',
							handler: function(){
								Ext.Viewport.animateActiveItem(app.Layout.MainPanel,{type:'slide',direction:'right'});
							}
						},
					]
				},
				me.List,
				me.SelectedList
			]
		});
	}
});

