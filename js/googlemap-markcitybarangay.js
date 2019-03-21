var tbody = $('#tableDetails tbody');
var table = $('#tableDetails');
  var activeIcon = {
    url: 'http://maps.google.com/mapfiles/ms/micons/yellow.png'
  };
  var normalIcon = {
    url: "http://maps.google.com/mapfiles/ms/micons/blue.png"
  };
  var barangayicon = {
    url: base_url+"/public/img/barangayicon20x20.png"
  };

$(function(){
	$(table).dataTable({		
        "lengthMenu": [[25, 50, 100, -1], [25, 50, 100, "All"]]
	});
})



		function getrespondents(city_code,option){


			$.ajax({
				url:site_url+'mapping/getrespondents',
				type:'post',
				dataType: 'json',
				data:'action='+true+'&city_code='+city_code,
				beforeSend: function(){

                $('.loading').removeClass('hidden');

            	},
				success: function(result){

					if (result.status == true) {

						notify('success','Details generated');
						if (option == 1) {
							
			if ($.fn.DataTable.isDataTable("#tableDetails")) {
 				 $(table).DataTable().clear().destroy();
				}
							tbody.empty();
							$.each(result.details,function(i,d){
							table.append('<tr>'+
								'<td>'+d.fname+' '+d.lname+'</td>'+
								'<td>'+d.address+'</td>'+
								'<td>'+d.farming_category+'</td>'+
								'</tr>');
							});
						$(table).dataTable();

						}else{

						markbarangays(result.details);
						}
						



					}else{
						notify('warning','No details generated')
					}
				},
              	error: function (request, status, error) {
                console.log(request.responseText);
            	},
            	complete: function(){

                $('.loading').addClass('hidden');

            	}
			});
		}
  
				var address = document.getElementById('address').innerHTML;
				address = JSON.parse(address);

				/*var address = [
					{id:1,name:'bilar',location:'bilar, bohol, Philippines'},
					{id:2,name:'carmen',location:'carmen, bohol, Philippines'},
					{id:3,name:'loboc',location:'loboc, bohol, Philippines'},
					{id:4,name:'batuan',location:'batuan, bohol, Philippines'},
					{id:5,name:'Zamora bilar',location:'zamora, bilar, bohol, Philippines'},
					];*/
				var map,
					geocoder;

	function loadMap() {
				var bohol = new google.maps.LatLng(9.83330, 124.166660);

				map = new google.maps.Map(
				      document.getElementById('map'), {
				      	zoom: 10, 
				      	center: bohol
				      });


				  geocoder = new google.maps.Geocoder();
				 addmarker(address);
			}

  				var markers = [];
			function addmarker(cdata){
				var	infowindow =  new google.maps.InfoWindow;

				  Array.prototype.forEach.call(cdata,function(i,n){


					var point = [];
				  	geocoder.geocode({
				  		'address': i.location
				  	}, function(result,status){
				  		if (status == 'OK') {
				  			map.setCenter(result[0].geometry.location);
				  			point.id = i.id
				  			point.lat = map.getCenter().lat();
				  			point.lng = map.getCenter().lng();

				  			address[n].lat = point.lat;
				  			address[n].lng = point.lng;

				  		var content = document.createElement('div');
				  		var strong = document.createElement('strong');
				  			strong.textContent = i.location;

				  		var a = document.createElement('a');
				  			a.href = 'http://phlab.tech';
				  			a.target = '_blank';
				  			a.title = 'Click for more info';
				  			a.appendChild(strong);
				  			content.appendChild(a);

				  		var br =  document.createElement('br');
				  		var btn1 =  document.createElement('button');
				  			btn1.id = 'listview'+n;
				  			btn1.className = 'btn btn-default btn-sm col-md-6';
				  			btn1.textContent = 'List';
				  			content.appendChild(br);
				  			content.appendChild(btn1);

				  		var btn2 =  document.createElement('button');
				  			btn2.id = 'markerview'+n;
				  			btn2.className = 'btn btn-default btn-sm col-md-6';
				  			btn2.textContent = 'Mark';
				  			content.appendChild(btn2);

						var mark = new google.maps.LatLng(point.lat, point.lng);					
					  	var	marker = new google.maps.Marker({
					  		position: mark, 
					  		map: map,
					  		icon: normalIcon
					  	});
    					markers.push(marker);

					  	marker.addListener('click', function(){
					  		infowindow.setContent(content);
					  		infowindow.open(map,marker);

					  		$(document).on('click','#listview'+n,function(){
							    if (infowindow) {
							        infowindow.close();
							    }
					        clearMarkers();
							  		$('#modalmap').modal('show');
							  		$('#modalmap .modal-title').html(i.location.toUpperCase());
							  		$('#modalmap #modalLatLng').html('Latitude: '+point.lat+'<br/>'+'Longitude: '+point.lng);

							  		$('#modalmap #details').html($('<div/>').addClass('respondents').append('Cacao farmers: '+i.respondents));
							  		
							  		getrespondents(i.id,1);

					  		})
					  		$(document).on('click','#markerview'+n,function(){
							    if (infowindow) {
							        infowindow.close();
							    }
					        		clearMarkers();
							  		getrespondents(i.id,2);
					  		})

					        for (var j = 0; j < markers.length; j++) {
					          markers[j].setIcon(normalIcon);
					        }
					        this.setIcon(activeIcon);
					        		clearMarkers();
					  		
					  	})

				  		}
				  	})
				  });

			}
			     function clearMarkers() {
        			setMapOnAll(null);
     			}
     			function setMapOnAll(map) {
				        for (var i = 0; i < marker2.length; i++) {
				          marker2[i].setMap(map);
				        }
				  }

				  var marker2 = [];
				

				function markbarangays(data) {
				  	// body...
				  	//console.log(data);
				  	marker2 = [];
				var	infowindow =  new google.maps.InfoWindow;
				  geocoder = new google.maps.Geocoder();

				  Array.prototype.forEach.call(data,function(i,n){


					var point = [];
				  	geocoder.geocode({
				  		'address': i.address
				  	}, function(result,status){
				  		if (status == 'OK') {

				  			map.setCenter(result[0].geometry.location);
				  			point.id = i.id
				  			point.lat = map.getCenter().lat();
				  			point.lng = map.getCenter().lng();



						var mark = new google.maps.LatLng(point.lat, point.lng);					
					  	var	marker = new google.maps.Marker({
					  		position: mark, 
					  		map: map,
					  		icon: barangayicon
					  	});
					  	marker2.push(marker);

					  	marker.addListener('click', function(){
					  		infowindow.setContent(i.address);
					  		infowindow.open(map,marker);

					  		
					  	})

				  		}
				  	})
				  });

				  }
				  function getbarangay(city_code) {
				  	// body...

				  }
		
