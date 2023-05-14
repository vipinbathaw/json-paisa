import { useState } from 'react';

const Password = (props) => {
  const [password, setPassword] = useState('');
  const [beginningBalance, setBeginningBalance] = useState(0);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length < 4) {
      setError('Password length should be atleast 4 characters');
    } else {
      props.initApp(password, beginningBalance);
    }
  };

  return (
    <div className="password box">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <h3>Provide Password</h3>
        </div>
        <div className="row">
          <p>A password is required to store/get your data.</p>
        </div>
        <div className="row">
          <p>This password will be used to import/export data as well.</p>
        </div>
        <div className="row">
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setError('');
              setPassword(e.target.value);
            }}
            placeholder="Password"
          />
        </div>
        <div className="row">
          <h3>Starting Balance (optional)</h3>
        </div>
        <div className="row">
          <p>Defaults to 0, you can always change it from settings.</p>
        </div>
        <div className="row">
          <input
            type="number"
            value={beginningBalance}
            onChange={(e) => setBeginningBalance(e.target.value)}
            placeholder="Starting balance"
          />
        </div>
        {error.length > 0 && (
          <div className="row">
            <p className="error">{error}</p>
          </div>
        )}
        <div className="row">
          <button>submit</button>
        </div>
      </form>
    </div>
  );
};

export default Password;
