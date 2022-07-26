const forms = () => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          inputsPhone = document.querySelectorAll('input[name="user_phone"]');

    inputsPhone.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, '');
        });
    });

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