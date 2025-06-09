function toggleFilterList(headerEl) {
    const group = headerEl.parentElement;
    const list = group.querySelector('ul');
    const arrow = headerEl.querySelector('.arrow');
    if (list.style.display === 'block') {
        list.style.display = 'none';
        arrow.textContent = '▸';
    } else {
        list.style.display = 'block';
        arrow.textContent = '▾';
    }
}
function toggleLogin() {
    window.location.href = '../alternative/login.html';
}

const sidebarLeft = document.getElementById('sidebarLeft');
const sidebarRight = document.getElementById('sidebarRight');
let blocksContainer = document.getElementById('blocksContainer');

function onBlockClick() {
    gsap.to(blocksContainer, { autoAlpha: 0, duration: 0.3, ease: 'power2.out' });

    gsap.to(sidebarLeft, { x: -280, duration: 0.4, ease: 'power2.out' });
    gsap.to(sidebarRight, { x: 0, duration: 0.4, ease: 'power2.out' });

    setTimeout(() => {
        HideShowMain("hide");
    }, 300);

    remindLogin();
}

function onBackClick() {
    blocksContainer = null;
    blocksContainer = document.getElementById('blocksContainer');
    gsap.to(sidebarRight, { x: 320, duration: 0.4, ease: 'power2.out' });
    gsap.to(sidebarLeft, { x: 0, duration: 0.4, ease: 'power2.out' });

    gsap.delayedCall(0.4, () => {
        blocksContainer.style.display = 'block';

        gsap.to(blocksContainer, { autoAlpha: 1, duration: 0.3, ease: 'power2.in' });

        HideShowMain("show");
    });

    HideShowMain("show")
}

function HideShowMain(show) {
    if (show === "show") {
        const mainSection = document.getElementById('blocksContainer');
        mainSection.style.display = 'flex';
        HideCalendar();
    }
    else {
        const mainSection = document.getElementById('blocksContainer');
        mainSection.style.display = 'none'; 
        const unavailableDates = ['2025-06-10', '2025-06-15'];
        const highTrafficDates = ['2025-06-12', '2025-06-20'];

        createCalendar('mainContent', unavailableDates, highTrafficDates);

    }
}

function remindLogin() {
    let loginreminder = document.getElementById('sidebarLogin');
    if (loginreminder) {
        gsap.to(loginreminder, { backgroundColor: '#ffcccc', duration: 0.5 });
        setTimeout(() => {
            gsap.to(loginreminder, { backgroundColor: '#ffffff', duration: 0.5 });
        }, 500);
    }
}

function createCalendar(parentId, unavailableDates = [], highTrafficDates = []) {
    const parent = document.getElementById(parentId);
    if (!parent) return;

    const existing = document.getElementById('calendarWrapper');
    if (existing) existing.remove();

    const wrapper = document.createElement('div');
    wrapper.id = 'calendarWrapper';
    wrapper.style.padding = '30px';
    wrapper.style.background = 'linear-gradient(145deg, #fff, #f5f5f5)';
    wrapper.style.border = '2px solid #ddd';
    wrapper.style.boxShadow = 'inset 0 0 12px rgba(0,0,0,0.05), 0 8px 16px rgba(0,0,0,0.08)';
    wrapper.style.maxWidth = '660px';
    wrapper.style.margin = '60px auto';
    wrapper.style.fontSize = '1.4rem';
    wrapper.style.fontFamily = 'Segoe UI, sans-serif';
    wrapper.style.color = '#222';
    parent.appendChild(wrapper);

    const monthsPL = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
    const weekdaysPL = ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb'];

    let selectedDate = null;
    const today = new Date();
    let viewYear = today.getFullYear();
    let viewMonth = today.getMonth();

    function updateSidebar(day)
    {
        let hoursGroup = document.getElementById("hours-group");
        let buttons = hoursGroup.getElementsByTagName("button");

        while (buttons.length != 0)
        {
            buttons[buttons.length-1].remove();
        }

        if (day % 7 != 0)
        {
            for(let i=9; i<19; i++)
            {
                let button = document.createElement("button");
                button.textContent = i + ":00";
                hoursGroup.appendChild(button);
            }
        }
        else
        {
            for(let i=9; i<15; i++)
            {
                let button = document.createElement("button");
                button.textContent = i + ":00";
                hoursGroup.appendChild(button);
            }
        }
    }

    function render(year, month) {
        wrapper.innerHTML = '';

        const maxMonth = (today.getMonth() === 11) ? { year: today.getFullYear() + 1, month: 0 } : { year: today.getFullYear(), month: today.getMonth() + 1 };
        const isCurrentMonth = (year === today.getFullYear() && month === today.getMonth());
        const isMaxMonth = (year === maxMonth.year && month === maxMonth.month);

        const header = document.createElement('div');
        header.style.display = 'flex';
        header.style.justifyContent = 'space-between';
        header.style.alignItems = 'center';
        header.style.marginBottom = '30px';

        const navBtnStyle = {
            background: 'rgba(255, 255, 255, 0.23)',
            borderRadius: '16px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(5.1px)',
            WebkitBackdropFilter: 'blur(5.1px)',
            border: '1px solid rgba(255, 255, 255, 0.44)',
            fontSize: '1.6rem',
            padding: '10px 20px',
            borderStyle: 'none',
            color: 'black',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'all 0.2s ease'
        };

        const prevBtn = document.createElement('button');
        prevBtn.textContent = '←';
        Object.assign(prevBtn.style, navBtnStyle);
        prevBtn.disabled = isCurrentMonth;
        if (isCurrentMonth) prevBtn.style.opacity = '0.4';
        prevBtn.onclick = () => {
            if (month === 0) { viewYear -= 1; viewMonth = 11; } else viewMonth--;
            render(viewYear, viewMonth);
        };

        const nextBtn = document.createElement('button');
        nextBtn.textContent = '→';
        Object.assign(nextBtn.style, navBtnStyle);
        nextBtn.disabled = isMaxMonth;
        if (isMaxMonth) nextBtn.style.opacity = '0.4';
        nextBtn.onclick = () => {
            if (month === 11) { viewYear += 1; viewMonth = 0; } else viewMonth++;
            render(viewYear, viewMonth);
        };

        const title = document.createElement('div');
        title.textContent = `${monthsPL[month]} ${year}`;
        title.style.fontWeight = 'bold';
        title.style.fontSize = '1.6rem';

        header.appendChild(prevBtn);
        header.appendChild(title);
        header.appendChild(nextBtn);
        wrapper.appendChild(header);

        const table = document.createElement('table');
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.textAlign = 'center';
        table.style.background = '#fff';
        table.style.border = '2px solid #eee';

        const headRow = document.createElement('tr');
        weekdaysPL.forEach(day => {
            const th = document.createElement('th');
            th.textContent = day;
            th.style.padding = '14px 0';
            th.style.color = '#888';
            th.style.fontWeight = '600';
            th.style.borderBottom = '2px solid #eee';
            headRow.appendChild(th);
        });
        table.appendChild(headRow);

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let tr = document.createElement('tr');
        for (let i = 0; i < firstDay; i++) tr.appendChild(document.createElement('td'));

        for (let day = 1; day <= daysInMonth; day++) {
            if ((firstDay + day - 1) % 7 === 0 && day !== 1) {
                table.appendChild(tr);
                tr = document.createElement('tr');
            }

            const td = document.createElement('td');
            td.textContent = day;


            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

            if (unavailableDates.includes(dateStr) || day % 7 == 1) {
                td.style.background = '#e57373';
                td.style.color = '#fff';
                td.style.cursor = 'not-allowed';
            } else if (highTrafficDates.includes(dateStr)) {
                td.style.background = '#fff9c4';
                td.style.color = '#222';
            }

            if (!unavailableDates.includes(dateStr) && day % 7 != 1 ) {
                td.addEventListener('mouseover', () => {
                    td.style.background = '#eee';
                    td.style.color = '#222';
                });
                td.addEventListener('mouseout', () => {
                    td.style.background = highTrafficDates.includes(dateStr) ? '#fff9c4' : '#fff';
                    td.style.color = highTrafficDates.includes(dateStr) ? '#222' : '#222';
                });
                td.onclick = () => {
                    selectedDate = dateStr;
                    wrapper.querySelectorAll('td').forEach(cell => cell.style.outline = '');
                    td.style.outline = '4px solid rgb(82, 82, 82)';
                    console.log('Wybrana data:', selectedDate);
                    updateSidebar(day)
                };
            }

            tr.appendChild(td);
        }

        table.appendChild(tr);
        wrapper.appendChild(table);
    }

    render(viewYear, viewMonth);
}

function HideCalendar() {
    const calendarWrapper = document.getElementById('calendarWrapper');
    if (calendarWrapper) {
        calendarWrapper.remove();
    }
}
