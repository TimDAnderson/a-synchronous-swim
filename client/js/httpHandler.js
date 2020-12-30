(function() {
  console.log('is this function even envoked?');

  const serverUrl = 'http://127.0.0.1:3000';
  //'https://localhost:3000

  //
  // TODO: build the swim command fetcher here
  //
  // const getRequest = (successCB, errorCB = null, path) => {
  //   console.log('we are sending a GET command');
  //       $.ajax({
  //     url: `${serverUrl}/${path}`,
  //     type: 'GET',
  //     // data: { order: '-createdAt' },
  //     // contentType: 'application/json',
  //     success: successCB,
  //     error: errorCB || function(error) {
  //       console.error('aSync Swim: Failed to fetch messages', error);
  //     }
  //   });
  // }

  const getRequest = (successCB, errorCB = null, path) => {
        $.ajax({
      url: `${serverUrl}/${path}`,
      type: 'GET',
      success: successCB,
      error: errorCB || function(error) {
        console.error('aSync Swim: Failed to fetch messages', error);
      },
      complete: setTimeout(()=>{getRequest((data)=>{
        SwimTeam.move(data);
      }, null, 'swimCommand')}, 100)
    });
  }


  setTimeout(()=>{getRequest((data)=>{
    SwimTeam.move(data);
  }, null, 'swimCommand')}, 100)



  // setInterval(()=>{getRequest((data)=>{
  //   console.log(data)
  //   SwimTeam.move(data);
  // }, null, 'swimCommand')}, 100)


  // setTimeout(messageTyper,0);


  // async function waitTime(time) {
  //   return new Promise((resolve) => {
  //      setTimeout(resolve, time);
  //   });
  // }
  // async function messageTyper() {
  //   while (true) {
  //      await waitTime(100);
  //      console.log('my spaced out message')
  //     //  SwimTeam.move('left');
  //     getRequest((data)=>{
  //       console.log(data)
  //       SwimTeam.move(data);
  //     }, null, 'swimCommand')
  //   }
  // }

  // messageTyper();




  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUplaod = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    console.log('we are sending a post command')
    $.ajax({
      type: 'POST',
      data: formData,
      url: `http://localhost:3000/background`,
      cache: false,
      contentType: false,
      processData: false,
      success: () => {
        // reload the page
        window.location = window.location.href;
      }
    });
  };

  $('form').on('submit', function(e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }

    ajaxFileUplaod(file);
  });

})();


