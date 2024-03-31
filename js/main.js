$(document).ready(function() {
  var onAudio = new Audio('audio/on.mp3');
  var offAudio = new Audio('audio/off.mp3');
  onAudio.volume = 0.3;
  offAudio.volume = 0.3;

  // Check if there is any existing student list in local storage
  if (localStorage.getItem('students')) {
    $('#studentList').html(localStorage.getItem('students'));
  }

  // Update progress bar
  function updateProgressBar() {
    var totalStudents = $('.list-item').length;
    var presentStudents = $('.button.is-success').length;
    var progress = (presentStudents / totalStudents) * 100;

    if (totalStudents === 0 && presentStudents === 0) {
      $('progress').attr('value', 0);
    } else {
      $('progress').attr('value', progress);
    }

    $('.presentStudents').text(presentStudents);
    $('.totalStudents').text(totalStudents);
  }

  // Event listener for adding a student
  $('#addStudentButton').on('click', function() {
    var studentName = prompt('Ange namn');

    // Validate if student name is provided
    if (studentName !== null && studentName !== '') {
      var listItem = `
        <div class="list-item">
          <div class="list-item-content">
            <div class="list-item-title">${studentName}</div>
          </div>
          <div class="list-item-controls">
            <div class="buttons is-right">
              <button class="button is-danger is-small changeStatus">
                <i class="fas fa-minus"></i>
              </button>
            </div>
          </div>
        </div>
      `;

      $('#studentList').append(listItem);

      // Save the updated student list to local storage
      localStorage.setItem('students', $('#studentList').html());

      // Update progress bar
      updateProgressBar();
    }
  });

  // Event listener for changing student status
  $(document).on('click', '.changeStatus', function() {
    var $statusButton = $(this);
    var $listItem = $statusButton.closest('.list-item');
    var $title = $listItem.find('.list-item-title');
    var statusOptions = ['is-danger', 'is-success'];
    var currentStatus = $statusButton.hasClass('is-danger') ? 'is-danger' : 'is-success';
    var currentAudio = $statusButton.hasClass('is-danger') ? onAudio.play() : offAudio.play();
    var currentIcon = $statusButton.hasClass('is-danger') ? $(this).html('<i class="fas fa-check"></i>') : $(this).html('<i class="fas fa-minus"></i>');
    var currentIndex = statusOptions.indexOf(currentStatus);
    var newIndex = (currentIndex + 1) % statusOptions.length;

    $statusButton.removeClass(currentStatus).addClass(statusOptions[newIndex]);

    // Save the updated student list to local storage
    localStorage.setItem('students', $('#studentList').html());

    // Update progress bar
    updateProgressBar();
  });

  // Event listener for removing a student
    $(document).on('click', '.list-item-title', function() {
    var $listItem = $(this).closest('.list-item');
    var studentName = $listItem.find('.list-item-title').text();

    // Ask for confirmation before removing the student
    var confirmation = confirm('Vill du ta bort ' + studentName + ' från listan?');

    if (confirmation) {
      $listItem.remove();

      // Save the updated student list to local storage
      localStorage.setItem('students', $('#studentList').html());

      // Update progress bar
      updateProgressBar();
    }
  });

  // Event listener for clearing the student list
  $('#clearListButton').on('click', function() {
    // Ask for confirmation before clearing the list
    var confirmation = confirm('Vill du rensa listan?');

    if (confirmation) {
      // Clear the student list in the DOM
      $('#studentList').empty();

      // Clear the student list in local storage
      localStorage.clear();

      // Update progress bar
      updateProgressBar();
    }
  });

  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function() {
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");
  });

  // Help btn click
  $('#helpButton').on('click', function() {
    swal("Hjälp", "Den här webbappen hjälper dig att kolla närvaro på ett enkelt sätt.\n\nLägg till namn i listan genom att trycka Lägg till-knappen.\n\nTryck på Status-knappen för att ändra status.\n\nTryck på ett namn för att ta bort det ur listan.");
  });

  // About btn click
  $('#aboutButton').on('click', function() {
    swal("Håll koll v.0.0.2", "Utvecklad av Kim Andersson.\nkandersson135@gmail.com");
  });

  // Initialize progress bar
  updateProgressBar();
});
