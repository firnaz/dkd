Ext.define('dkd.view.Chart',{
	requires: [
		'Ext.Panel',
		'Ext.Container',
		'Ext.navigation',
		'Ext.tab.Panel',
		'Ext.chart.CartesianChart',
		'Ext.grid.Grid',
		'Ext.SegmentedButton'
    ],
	MainPanel:null,
	display: 'region',
	activeItem: 'line',
	jenis_laporan:'ANGGARAN',
	constructor: function (){
		var me = this;
		me.createPanel();
	},
	createPanel:function(){
		var me = this;


		me.LinePanel = new Ext.tab.Panel({
			tabBar : {
				docked     : 'top',
				scrollable : 'horizontal'
			},
			items:[
			]
		});

		me.BarPanel = new Ext.tab.Panel({
			tabBar : {
				docked     : 'top',
				scrollable : 'horizontal'
			},
			items:[
			]
		});

		me.GridPanel = new Ext.tab.Panel({
			tabBar : {
				docked     : 'top',
				scrollable : 'horizontal'
			},
			items:[
			]
		});

		me.topButton = new Ext.SegmentedButton({
			allowDepress:false,
			items:[
				{
					title:'',
					ui:'small',
					iconCls:'icon-linechart',
					pressed:true,
					handler : function(){
						me.activeItem = 'line';
						me.MainPanel.animateActiveItem(me.LinePanel,{type:'fade'});
					}
				},
				{
					title:'',
					ui:'small',
					iconCls:'icon-barchart',
					handler : function(){
						me.activeItem = 'bar';
						me.MainPanel.animateActiveItem(me.BarPanel,{type:'fade'});
					}
				},
				{
					title:'',
					ui:'small',
					iconCls:'icon-table',
					handler : function(){
						me.activeItem = 'table';
						me.MainPanel.animateActiveItem(me.GridPanel,{type:'fade'});
					}
				}
			]
		});

		me.MainPanel = new Ext.Panel({
			layout: 'card',
			items: [
				{
					docked: 'top',
					xtype: 'toolbar',
					// title: 'Grafik',
					items: [
						{
							ui:'back',
							text:'Kembali',
							align : 'left',
							handler : function(){
								Ext.Viewport.animateActiveItem(app.Layout.MainPanel,{type:'slide',direction:'right'});
							}
						},
						{xtype:'spacer'},
						me.topButton,
						{xtype:'spacer'},
						{
							title:'',
							align:'right',
							ui:'small',
							iconCls:'icon-swap',
							handler:function(){
								me.toggleDisplay();
							}
						},
						{
							title:'',
							align:'right',
							ui:'small',
							iconCls:'icon-share',
							handler: function(){
								me.shareCurrent();
							}
						}
					]
				},
				me.LinePanel,
				me.BarPanel,
				me.GridPanel
			],
			listeners:{
				show: function(panel, eOpts){
					me.LinePanel.setActiveItem(0);
					me.BarPanel.setActiveItem(0);
					me.GridPanel.setActiveItem(0);

					me.LinePanel.getTabBar().getScrollable().getScroller().scrollToTop(true);
					me.BarPanel.getTabBar().getScrollable().getScroller().scrollToTop(true);
					me.GridPanel.getTabBar().getScrollable().getScroller().scrollToTop(true);


					me.topButton.setPressedButtons([0]);
					me.MainPanel.setActiveItem(me.LinePanel);
				}
			}
		});
	},
	toggleDisplay:function(){
		var me=this;
		if(me.display=="region"){
			me.display="indikator";
		}else{
			me.display="region";
		}
		app.Layout.showTampilan(me.display, me.jenis_laporan);
		me.topButton.setPressedButtons([0]);
	},
	shareCurrent:function(){
		var me = this;
		var config, chart;
		if(me.activeItem!="table"){
			config = me.MainPanel.getActiveItem().getActiveItem().getActiveItem().config;
			config.animate=false;
			config.legend = {
				position:"right",
				inline:false,
				wrap: false,
				toggleable: false,
				verticalWidth: 215,
				itemConfig:{
					width:215,
					maxWidth:215
				},
				itemTpl: [
					"<span class=\"x-legend-item-marker {[values.disabled?\"x-legend-inactive\":\"\"]}\" style=\"background:{mark};\"></span><span class=\"wrap-text\">{name}</span>"
				]
			};
			delete config.interactions;

			Ext.each(config.series, function(item,index){
				item.chart = null;
			});

			var url = app.apiURL+'getchartimage';
			Ext.Viewport.setMasked(true);
			Ext.Ajax.request({
				url: url,
	            useDefaultXhrHeader: false,
				params:{
					config: Ext.JSON.encode(config),
					title: me.LinePanel.getActiveItem().config.title,
					jenis_laporan: me.jenis_laporan
				},
				method: 'GET',
				success: function(response){
					var result = response.responseText;
					// console.log(result);
					share(result);
					Ext.Viewport.setMasked(false);
				},
				failure:function(response){
					Ext.msg.Alert("Error!","Terdapat kesalahan pada server!!");
				}
			});
		}else{
			config = me.MainPanel.getActiveItem().getActiveItem().getActiveItem().config;
			var store = config.store;
			var columns = config.othercolumns;
			var url = app.apiURL+'gettableimage';
			Ext.Viewport.setMasked(true);
			Ext.Ajax.request({
				url: url,
	            useDefaultXhrHeader: false,
				params:{
					store: Ext.JSON.encode(store),
					columns: Ext.JSON.encode(columns),
					title: me.LinePanel.getActiveItem().config.title,
					jenis_laporan: me.jenis_laporan
				},
				method: 'GET',
				success: function(response){
					var result = response.responseText;
					// console.log(result);
					share(result);
					Ext.Viewport.setMasked(false);
				},
				failure:function(response){
					Ext.msg.Alert("Error!","Terdapat kesalahan pada server!!");
				}
			});
			return;
		}
	}
});

