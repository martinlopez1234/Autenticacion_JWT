const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			verifieUser: false,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			getToken: (email, password) => {
				fetch(process.env.BACKEND_URL + '/api/token',{
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password
					}),
					redirect: "follow"
				})
				.then(response => response.json())
				.then(result => {
					sessionStorage.setItem("token", result.token)
					setStore({token: result.token})})
				.catch(err => console.log(err));
			},

			getVerified: () => {
				fetch(process.env.BACKEND_URL + '/api/protected',{
					method: 'GET',
						headers: {
							"Authorization": "Bearer " + getStore().token
						},						
						redirect: "follow"
				})
				.then((res) => res.ok ? setStore({verifieUser: true}):"")
				.catch((err) => console.log(err));
			},

			createUser: (email, password, is_active) => {
				fetch(process.env.BACKEND_URL + '/api/signup',{
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password,
						is_active: is_active
					}),
					redirect: "follow"
				})
				.then(response => response.json())
				.then(data=>{console.log('Succes: ',data)})
				.catch(err => console.log(err));
			},
		

			syncTokenFromSessionStore: () => {
				const token = sessionStorage.getItem("token");
				console.log("Aplication just loaded, synching the session storage token")
				if (token && token!="" && token != undefined) setStore({ token: token});
			},

			logout: () => {
				sessionStorage.removeItem("token");
				console.log("Login out")
				setStore({ token: null});
				setStore({verifieUser: false})				
			},

		
		}
	};
};

export default getState;
