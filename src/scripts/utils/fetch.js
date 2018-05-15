import qs from 'qs'; //用来序列化对象，或解析url
import 'whatwg-fetch';

let _fetch = ((fetch) => {
  return (url, options) => {
    let abort = null;
    let abortPromise = new Promise((resolve, reject) => {
      abort = () => {
        reject('abort');
      };
    });
    let promise = Promise.race([fetch(url, options), abortPromise]);
    promise.abort = abort;
    return promise;
  };
})(fetch);

let cf = {
  fetchList: new Set(),
  fetchCount: 0
};

cf.customFetch = (url, data, opt) => {
  let headers = {
    "Content-Type": opt['Content-Type'] || "application/json",
    "X-Requested-With": 'XMLHttpRequest'
  };
  let fetchOpt = {
    method: opt.method || "POST",
    credentials: 'include',
    headers
  };
  if (opt.method === "GET") {
    let str = qs.stringify(data);
    if (/\?$/.test(url)) {
      url = url + '&' + str;
    } else {
      if (str && str !== '{}') {
        url = url + '?' + str;
      }
    }
  } else {
    if (opt['Content-Type'].indexOf('application/json') > -1) {
      fetchOpt.body = JSON.stringify(data);
    }
    if (opt['Content-Type'].indexOf('application/x-www-form-urlencoded') > -1) {
      fetchOpt.body = qs.stringify(data);
    }
    // fetch请求form-data不能指定Content-Type？？？
    if (opt['Content-Type'].indexOf('multipart/form-data') > -1) {
      fetchOpt.body = data;
      delete fetchOpt.headers['Content-Type'];
    }
  }
  return new Promise((resolve, reject) => {
    let f = _fetch(url, fetchOpt);
    cf.fetchList.add(f);
    f.then((res) => {
      if (res.ok) {
        if (opt['Content-Type'] === 'application/octet-stream') {
          return res.blob();
        } else if (opt['Content-Type'] === 'Html/text') {
          return res.text();
        } else {
          return res.json();
        }
      } else {
        reject("请求错误" + res.status);
      }
    }, (err) => {
      reject(err);
    }).then((json) => {
      resolve(json);
      cf.fetchList.delete(f);
      cf.fetchCount--;
    }, (err) => {
      reject(err);
      cf.fetchList.delete(f);
      cf.fetchCount--;
    });
  });
};

cf.fetchGet = (url, data) => {
  return cf.customFetch(url, data, {
		method: 'GET'
	});
};

cf.postForm = (url, data) => {
	return customFetch(url, data, {
		method: 'POST',
		"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
	});
};

cf.postJSON = (url, data) => {
	return customFetch(url, data, {
		method: 'POST',
		"Content-Type": "application/json; charset=UTF-8"
	});
};

cf.postFormData = (url, data) => {
	return customFetch(url, data, {
		method: 'POST',
		"Content-Type": "multipart/form-data"
	});
};

window.addEventListener('keyup', e => {
  if (e.keyCode === 27) {
    for (let f of cf.fetchList) {
      f.abort();
    }
  }
});

export default cf;