// document.addEventListener('DOMContentLoaded', function() {
//     document.getElementById('alertButton').addEventListener('click', hello);
// });

// function hello() {
//     const hostname = window.location.hostname; 
//     window.alert(hostname);

// }

document.addEventListener('DOMContentLoaded', () => {
    const alertButton = document.getElementById('alertButton');
    if (alertButton) {
      alertButton.addEventListener('click', () => {
        alert(window.location.hostname);
      });
    }
  });
  