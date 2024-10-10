const LiferayService = {
  get: async (url) => {
    if (typeof window['Liferay'] != 'undefined') {
      try {
        const response = await window['Liferay'].Util.fetch(url);
        const data = response.json();
        if (response.ok) {
          return data;
        }
      } catch (error) {
        console.error(error);
        window['Liferay'].Util.openToast({
          message: 'An error occured.',
          type: 'danger',
        });
      }
    } else {
      console.error("Liferay (JS Object) doesn't exist.");
    }
  },
  post: async (url, payload) => {
    if (typeof window['Liferay'] != 'undefined') {
      try {
        const response = await window['Liferay'].Util.fetch(url, {
          body: JSON.stringify(payload),
          method: `POST`,
          headers: [['content-type', 'application/json']],
        });
        const data = response.json();
        if (response.ok) {
          return data;
        } else {
          window['Liferay'].Util.openToast({
            title: data.status,
            message: 'An error occured.',
            type: 'danger',
          });
        }
      } catch (error) {
        console.error(error);
        window['Liferay'].Util.openToast({
          message: 'An error occured.',
          type: 'danger',
        });
      }
    } else {
      console.error("Liferay (JS Object) doesn't exist.");
    }
  },
  patch: async (url, payload, options) => {
    if (typeof window['Liferay'] != 'undefined') {
      try {
        const response = await window['Liferay'].Util.fetch(url, {
          body: JSON.stringify(payload),
          method: `PATCH`,
          headers: [['content-type', 'application/json']],
        });
        const data = response.json();
        if (response.ok) {
          window['Liferay'].Util.openToast({
            message: (options && options["message"]["success"]) || 'Your request has been completed.',
            type: 'success',
          });
          return data;
        } else {
          const error = await data;
          window['Liferay'].Util.openToast({
            message: (options && options["message"]["error"]) || error.title,
            type: 'danger',
          });
        }
      } catch (error) {
        console.error(error);
        window['Liferay'].Util.openToast({
          message: 'An error occured.',
          type: 'danger',
        });
      }
    } else {
      console.error("Liferay (JS Object) doesn't exist.");
    }
  },
  put: async (url, payload) => {
    if (typeof window['Liferay'] != 'undefined') {
      try {
        const response = await window['Liferay'].Util.fetch(url, {
          body: JSON.stringify(payload),
          method: `PUT`,
          headers: [['content-type', 'application/json']],
        });
        const data = response.json();
        if (response.ok) {
          return data;
        } else {
          window['Liferay'].Util.openToast({
            title: data.status,
            message: 'An error occured.',
            type: 'danger',
          });
        }
      } catch (error) {
        console.error(error);
        window['Liferay'].Util.openToast({
          message: 'An error occured.',
          type: 'danger',
        });
      }
    } else {
      console.error("Liferay (JS Object) doesn't exist.");
    }
  },
  delete: async (url) => {
    if (typeof window['Liferay'] != 'undefined') {
      try {
        const response = await window['Liferay'].Util.fetch(url, {
          method: `DELETE`,
        });
        const data = response.json();
        if (response.ok) {
          return data;
        } else {
          window['Liferay'].Util.openToast({
            title: data.status,
            message: 'An error occured.',
            type: 'danger',
          });
        }
      } catch (error) {
        console.error(error);
        window['Liferay'].Util.openToast({
          message: 'An error occured.',
          type: 'danger',
        });
      }
    } else {
      console.error("Liferay (JS Object) doesn't exist.");
    }
  },
};

export default LiferayService;