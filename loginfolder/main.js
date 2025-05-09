
document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (storedUser && storedUser.username === username && storedUser.password === password) {
    
    // store session info
    sessionStorage.setItem('currentUser', username);
    alert('Login successful!');
    window.location.href = '/mainfolder/main.html';
  } else {
    alert('Incorrect username or password!');
  }
});