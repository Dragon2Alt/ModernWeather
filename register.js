 document.getElementById('register-form').addEventListener('submit', function(e) {
   e.preventDefault();
   const username = document.getElementById('reg-username').value;
   const password = document.getElementById('reg-password').value;
   // For demo: store as JSON string (insecure for real apps)
   localStorage.setItem('user', JSON.stringify({ username, password }));
   alert('Registration successful!');
   window.location.href = 'login.html';
 });