window.addEventListener("load", function () {
    (function ($) {
        $(function () {
            const architectureSystemMapping = {
                's390x': ['zVM', 'zKVM', 'LPAR zSeries'],
                'x86_64': ['BareMetal', 'KVM', 'XEN', 'HMC'],

                'ppc64': ['LPAR PowerPC', 'PowerVM', 'KVM', 'HMC', 'BareMetal'],
                'ppc64le': ['LPAR PowerPC', 'PowerVM', 'KVM', 'HMC', 'BareMetal'],

                'aarch64': ['BareMetal', 'KVM'],
                'embedded': ['BareMetal', 'Storage Array', 'FC Switch', 'Network Switch', 'Omni-Path Switch']
            };

            function filterSystems() {
                const architectureSelect = document.getElementById('id_architecture');
                const systemSelect = document.getElementById('id_system');
                const selectedSystem = systemSelect.options[systemSelect.selectedIndex].text;
                const selectedArchitecture = architectureSelect.options[architectureSelect.selectedIndex].text;
                const allowedSystems = architectureSystemMapping[selectedArchitecture] || [];

                if (!allowedSystems.includes(selectedSystem)) {
                    systemSelect.selectedIndex = 0;
                }

                for (let i = 0; i < systemSelect.options.length; i++) {
                    const systemOption = systemSelect.options[i];
                    if (allowedSystems.length === 0 || allowedSystems.includes(systemOption.text)) {
                        systemOption.style.display = 'block';
                        systemOption.disabled = false;
                    } else {
                        systemOption.disabled = true;
                    }
                }
            }

            document.getElementById('id_architecture').addEventListener('change', filterSystems);
            filterSystems();
        });
    })(django.jQuery);
});
