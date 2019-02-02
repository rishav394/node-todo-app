$(document).ready(function () {
	console.log("ok");
	$('form').on('submit', function () {

		var item = $('form input');
		// alert(item.val());
		var todo = {
			item: item.val()
		};
		console.log(todo.item + " in JS");
		$.ajax({
			type: 'POST',
			url: '/todo',
			data: todo,
			success: function (data) {
				//do something with the data via front-end framework
				location.reload();
			}
		});

		return false;

	});

	$('li').on('click', function () {
		var item = $(this).text();
		$.ajax({
			type: 'DELETE',
			url: '/todo/' + item,
			success: function (data) {
				//do something with the data via front-end framework
				location.reload();
			}
		});
	});

});