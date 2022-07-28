import checkNumInputs from './checkNumInputs';

const forms = (state) => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input');

    checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: 'loading',
        success: 'success',
        failure: 'failure',
    };

    const postData = async (url, data) => {
        let res = await fetch(url, {
            method: "POST",
            body: data,
        });

        document.querySelector('.status').textContent = message.loading;

        return await res.text();
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);
            if (item.getAttribute('data-calc') === "end") {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    document.querySelector('.status').textContent = message.success;
                })
                .catch(() => {document.querySelector('.status').textContent = message.failure})
                .finally(setTimeout(() => {
                    clearInputs();
                    statusMessage.remove();
                }, 5000));
        });
    });
};

export default forms;