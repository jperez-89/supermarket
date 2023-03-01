(function () {
	"use strict";

	var treeviewMenu = $('.app-menu');

	// Toggle Sidebar
	$('[data-toggle="sidebar"]').click(function (event) {
		event.preventDefault();
		$('.app').toggleClass('sidenav-toggled');
	});

	// Activate sidebar treeview toggle
	$("[data-toggle='treeview']").click(function (event) {
		event.preventDefault();
		if (!$(this).parent().hasClass('is-expanded')) {
			treeviewMenu.find("[data-toggle='treeview']").parent().removeClass('is-expanded');
		}
		$(this).parent().toggleClass('is-expanded');
	});

	// Set initial active toggle
	$("[data-toggle='treeview.'].is-expanded").parent().toggleClass('is-expanded');

	//Activate bootstrip tooltips
	// $("[data-toggle='tooltip']").tooltip();

})();

var audio = new Audio('Assets/mp3/beep.mp3');
function PlayAudio() {
	audio.play();
}

function fnt_Fetch(url, method = '', Databody) {
	var jsonResponse;

	if (method == 'post') {
		jsonResponse = fetch(url, {
			method: method,
			body: Databody
		}).then(res => res.json())
	} else {
		jsonResponse = fetch(url).then(res => res.json())
	}
	return jsonResponse;
}

function pfrm(frm) {
	new Response(frm).text().then(console.log);
}

async function swalMixin(icon, title, position, timer) {
	const Toast = Swal.mixin({
		toast: true,
		iconColor: 'white',
		customClass: {
			popup: 'colored-toast'
		},
		position: position,
		showConfirmButton: false,
		timer: timer,
		timerProgressBar: true,
		// didOpen: (toast) => {
		//      toast.addEventListener('mouseenter', Swal.stopTimer)
		//      toast.addEventListener('mouseleave', Swal.resumeTimer)
		// }
	})

	await Toast.fire({
		icon: icon,
		title: title
	})
}

function generarPDF(id) {
	url = `${base_url}facturacion/generarPDF/${id}`;
	window.open(url, 'blank');
}

