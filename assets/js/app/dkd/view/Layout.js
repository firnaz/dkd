//Layout.js
Ext.define('dkd.view.Layout',{
	requires: [
		'Ext.Panel',
		'Ext.Container',
		'Ext.navigation',
		'Ext.tab.Panel',
		'dkd.store.SelectedRegion',
		'dkd.store.SelectedIndikator',
		'dkd.store.SelectedTahun',
		'Ext.chart.CartesianChart'
    ],
	colors:[
		'rgb(143,203,203)',
		'rgb(255,203,203)',
		'rgb(143,255,203)',
		'rgb(123,123,203)',
		'rgb(123,203,255)'
	],
	MainPanel:null,
	Store: {},
	constructor: function(store){
		var me = this;
		me.Store.SelectedRegion = store.SelectedRegion;
		me.Store.SelectedIndikator = store.SelectedIndikator;
		me.Store.SelectedTahun = store.SelectedTahun;
		me.createPanel();
	},
	createPanel:function(){
		var me = this;

		me.regionPanel = new Ext.Panel({
			title: 'Daerah',
			layout: 'fit',
			items:[
				{
					xtype: 'list',
					store: me.Store.SelectedRegion,
					itemTpl: '{name}',
					disableSelection: true,
					emptyText: 'Belum ada daerah yang terpilih'
				},
				{
					docked: 'top',
					xtype: 'toolbar',
					cls: 'inner-toolbar',
					items: [
						{xtype:'spacer'},
						{
							xtype: 'button',
							iconCls: 'icon-addlist',
							text: 'Pilih daerah (maksimal 5)',
							ui: 'action',
							handler : function(){
								Ext.Viewport.animateActiveItem(app.Region.Panel,{type:'slide',direction:'left'});
							}
						},
						{xtype:'spacer'}
					]
				}
			]
		});

		me.indikatorPanel = new Ext.Panel({
			title: 'Indikator',
			layout: 'fit',
			items:[
				{
					xtype: 'list',
					store: me.Store.SelectedIndikator,
					itemTpl: '{name}',
					disableSelection: true,
					emptyText: 'Belum ada indikator yang terpilih'
				},
				{
					docked: 'top',
					xtype: 'toolbar',
					cls: 'inner-toolbar',
					items: [
						{xtype:'spacer'},
						{
							xtype: 'button',
							iconCls: 'icon-addlist',
							text: 'Pilih indikator (maksimal 5)',
							ui: 'action',
							handler : function(){
								Ext.Viewport.animateActiveItem(app.Indikator.Panel,{type:'slide',direction:'left'});
							}
						},
						{xtype:'spacer'}
					]
				}
			]
		});

		me.tahunPanel = new Ext.Panel({
			title: 'Tahun',
			layout: 'fit',
			items:[
				{
					xtype: 'list',
					store: me.Store.SelectedTahun,
					itemTpl: '<div class="center">{name}</div>',
					disableSelection: true,
					emptyText: 'Belum ada tahun yang terpilih'
				},
				{
					docked: 'top',
					xtype: 'toolbar',
					cls: 'inner-toolbar',
					items: [
						{xtype:'spacer'},
						{
							xtype: 'button',
							iconCls: 'icon-addlist',
							text: 'Pilih tahun (maksimal 5)',
							ui: 'action',
							handler : function(){
								Ext.Viewport.animateActiveItem(app.Tahun.Panel,{type:'slide',direction:'left'});
							}
						},
						{xtype:'spacer'}
					]
				}
			]
		});
		me.selectCriteriaPanel = new Ext.tab.Panel({
			ui: 'light',
			tabBar: {
				ui: 'dark',
				layout: {
					pack: 'center'
				}
			},
			activeTab: 1,
			defaults: {
				scrollable: true
			},
			items: [
				me.regionPanel,
				me.indikatorPanel,
				me.tahunPanel
			]
		});

		me.MainPanel = new Ext.Panel({
			layout: 'card',
			items: [
				me.selectCriteriaPanel,
				{
					docked: 'top',
					xtype: 'titlebar',
					title: 'Data Keuangan Pemerintah Daerah',
					items: [
						{
							iconCls: 'icon-menu',
							align : 'left',
							handler : function(){
								Ext.Viewport.toggleMenu('left');
							}
						},
						{
							iconCls: 'refresh',
							align : 'right',
							handler : function(){
								me.Store.SelectedRegion.removeAll();
								me.Store.SelectedIndikator.removeAll();
								me.Store.SelectedTahun.removeAll();
								app.Region.list.RegionPemda.deselectAll();
								app.Region.list.RegionProvinsi.deselectAll();
								app.Indikator.List.deselectAll();
								app.Tahun.List.deselectAll();
							}
						}
					]
				},
				{
					docked: 'bottom',
					xtype: 'toolbar',
					layout: {
						pack: 'center',
						type: 'hbox'
					},
					items: [
						{
							xtype: 'button',
							text: 'Anggaran',
							ui: 'action',
							handler : function(){
								if(me.Store.SelectedRegion.getCount()===0){
									Ext.Msg.alert("Peringatan","Anda belum memilih daerah!");
									return false;
								}
								if(me.Store.SelectedIndikator.getCount()===0){
									Ext.Msg.alert("Peringatan","Anda belum memilih indikator!");
									return false;
								}
								if(me.Store.SelectedTahun.getCount()===0){
									Ext.Msg.alert("Peringatan","Anda belum memilih tahun!");
									return false;
								}
								me.showTampilan('region', 'ANGGARAN');
							}
						},
						{
							xtype: 'button',
							text: 'Realisasi',
							ui: 'action',
							handler : function(){
								if(me.Store.SelectedRegion.getCount()===0){
									Ext.Msg.alert("Peringatan","Anda belum memilih daerah!");
									return false;
								}
								if(me.Store.SelectedIndikator.getCount()===0){
									Ext.Msg.alert("Peringatan","Anda belum memilih indikator!");
									return false;
								}
								if(me.Store.SelectedTahun.getCount()===0){
									Ext.Msg.alert("Peringatan","Anda belum memilih tahun!");
									return false;
								}
								me.showTampilan('region','REALISASI');
							}
						}
					]
				}
			]
		});
	},
	showTampilan:function(display,jenis){
		var me = this;
		var dataregion=[], dataindikator=[], datatahun=[];
		me.Store.SelectedRegion.each(function(item,index,length){
			dataregion.push(item.raw);
		});

		me.Store.SelectedIndikator.each(function(item,index,length){
			dataindikator.push(item.raw);
		});

		me.Store.SelectedTahun.each(function(item,index,length){
			datatahun.push(item.raw);
		});

		app.Chart.display=display;
		var url = app.apiURL+'grafik/'+display;
		Ext.Viewport.setMasked(true);
		Ext.Ajax.request({
			url: url,
            useDefaultXhrHeader: false,
			params:{
				region: Ext.JSON.encode(dataregion),
				tahun: Ext.JSON.encode(datatahun),
				indikator: Ext.JSON.encode(dataindikator),
				jenis: jenis
			},
			method: 'GET',
			success: function(response){
				var result = Ext.JSON.decode(response.responseText);
				var xtitle, ytitle, ycount, data;
				var panel;

				// generate chart
				app.Chart.LinePanel.removeAll(true);
				app.Chart.BarPanel.removeAll(true);
				app.Chart.GridPanel.removeAll(true);
				Ext.each(result,function(item, index, result){
					app.Chart.LinePanel.add(me.createLineChart(item.xtitle, item.ytitle, item.ycount,item.data));
					app.Chart.BarPanel.add(me.createBarChart(item.xtitle, item.ytitle, item.ycount,item.data));
					app.Chart.GridPanel.add(me.createGrid(item.xtitle, item.ytitle, item.ycount,item.data));
				});

				app.Chart.jenis_laporan = jenis;

				//show Chart Panel
				app.Chart.MainPanel.setActiveItem(app.Chart.LinePanel);
				Ext.Viewport.animateActiveItem(app.Chart.MainPanel,{type:'slide',direction:'left'});
				Ext.Viewport.setMasked(false);
			},
			failure:function(response){
				Ext.msg.Alert("Error!","Terdapat kesalahan pada server!!");
			}
		});
	},
	createLineChart:function(xtitle,ytitle,ycount,data){
		var me = this;
		var series=[], serie={}, fields=[];
		var store = {
			data:data,
			fields:['tahun']
		};

		for(var i=1; i<=ycount;i++){
			serie = {
					type: 'line',
					highlight: {
						size: 7,
						radius: 7
					},
					style: {
						stroke: me.colors[i-1]
					},
					xField: 'tahun',
					yField: 'data'+i,
					title: ytitle[i-1],
					marker: {
						type: 'circle',
						fill: me.colors[i-1],
						radius: 4
					}
				};
			series.push(serie);
			fields.push("data"+i);
			store.fields.push("data"+i);
		}

		var lineChart = new Ext.chart.CartesianChart({
			animate: true,
			legend:{
				position:'bottom'
			},
			interactions: [
				{
					type: 'iteminfo',
					listeners: {
						show: function(interaction, item, panel) {
							// console.log(ytitle);
							me.chartInfo(item,panel,xtitle,ytitle);
						}
					}
				}
			],
			store: store,
			axes: [
				{
					type: 'numeric',
					position: 'left',
					fields: fields,
					grid: true,
					renderer: function(label, layout, lastlabel){
						return numeral(label).format('0,0');
					},
					title: {
						text: '(Dalam Jutaan)',
						fontSize: 15,
						fontStyle: 'italic'
					},
					titleMargin:20
				},
				{
					type: 'category',
					position: 'bottom',
					fields: ['tahun'],
					title: {
						text: 'Tahun',
						fontSize: 15
					}
				}
			],
			series: series
		});
		return new Ext.Container({
			layout:'fit',
			title:xtitle,
			items:[lineChart]
		});
	},
	createBarChart: function(xtitle, ytitle, ycount, data){
		var me = this;
		var series=[], fields=[];
		var store = {
			data:data,
			fields:['tahun']
		};

		for(var i=1; i<=ycount;i++){
			fields.push("data"+i);
			store.fields.push("data"+i);
		}
		var barChart = new Ext.chart.CartesianChart({
			animate: true,
			legend:{
				position:'bottom'
			},
			colors:me.colors,
			interactions: [
				{
					type: 'iteminfo',
					listeners: {
						show: function(interaction, item, panel) {
							// console.log(ytitle);
							me.chartInfo(item,panel,xtitle,ytitle);
						}
					}
				}
			],
			store: store,
			axes: [{
				type: 'numeric',
				position: 'left',
				fields: fields,
				grid: true,
				renderer: function(label, layout, lastlabel){
					return numeral(label).format('0,0');
				},
				title: {
					text: '(Dalam Jutaan)',
					fontSize: 15,
					fontStyle: 'italic'
				},
				titleMargin:20
			}, {
				type: 'category',
				position: 'bottom',
				fields: ['tahun'],
				title: {
					text: 'Tahun',
					fontSize: 15
				}
			}],
			series: [
				{
					type: 'bar',
					xField: 'tahun',
					yField: fields,
					stacked: false,
					title: ytitle
				}
			]
		});
		return new Ext.Container({
			layout:'fit',
			title:xtitle,
			items:[barChart]
		});
	},
	createGrid: function(xtitle, ytitle, ycount, data){
		var me = this;
		var series=[], fields=[], rightColumn=[];
		var store = {
			data:data,
			fields:['tahun']
		};

		for(var i=1; i<=ycount;i++){
			fields.push("data"+i);
			store.fields.push("data"+i);
			rightColumn.push({
				text: ytitle[i-1],
				dataIndex: "data"+i,
				width: (ytitle[i-1].length*10<120)?180:ytitle[i-1].length*10,
				align: 'center',
				sortable: false,
				renderer: function(label){
					return numeral(label).format('0,0');
				}
			});
		}

		var leftGrid = Ext.create('Ext.grid.Grid', {
			width: 80,
			disableSelection:true,
			store: store,
			headerContainer: {
				xtype: 'headercontainer',
				height:30
			},
			titleBar:{
				xtype:'titlebar',
				hidden:true
			},
			itemHeight:30,
			columns: [
				{text: 'Tahun',  dataIndex: 'tahun', width: 80, align:'center', sortable:false}
			],
			othercolumns:rightColumn
		});

		var rightGrid = Ext.create('Ext.grid.Grid', {
			// title: 'Belanja Pegawai',
			flex:2,
			disableSelection:true,
			store: store,
			headerContainer: {
				xtype: 'headercontainer',
				height:30
			},
			titleBar:{
				xtype:'titlebar',
				hidden:true
			},
			itemHeight:30,
			columns: rightColumn
		});

		return new Ext.Container({
			title: xtitle,
			layout: 'hbox',
			items:[
				leftGrid,
				rightGrid
			]
		});
	},
	chartInfo: function(data, panel, xtitle, ytitle){
		//set Title
		var me = this;
		var dockedItems = panel.getDockedItems();
		Ext.each(dockedItems,function(item,index){
			if(item.getDocked()=="top"){
				item.setTitle(xtitle);
				return;
			}
		});

		//set Content
		var html="</h4>Tahun: "+data.record.get("tahun")+"</h4>";
		for(var i=1;i<=ytitle.length; i++){
			html=html+"<div><span class=\"info-item-marker\" style=\"background:"+me.colors[i-1]+";\"></span><span style=\"display:table-cell;\">"+ytitle[i-1]+": "+numeral(data.record.get("data"+i)).format('0,0')+"</span></div>";
		}
		html= html;

		panel.setHtml(html);
	}
});

