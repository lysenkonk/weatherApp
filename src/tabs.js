import $ from 'jquery';
import {updateDOM} from './updateDom.js';

var currentTab;
function addListenToTabs(data) {

    let buttons = $('.tabset a');
    let speed = 300;
    currentTab = $(buttons.filter('.active').attr('href'));
    buttons.each(function () {
        let tabsId = $(this).attr('href');
        $(tabsId).css('display', 'none');

    });
    currentTab.css('display', 'block');


    buttons.click(function (e) {
        let link = $(this);

        updateDOM(data, currentTab);
        if (!link.hasClass('active')) {
            buttons.removeClass('active');
            link.addClass('active');
            currentTab.fadeOut(speed, function () {
                currentTab = $(link.attr('href'));
                currentTab.fadeIn(speed);
            });

        }
        e.preventDefault();
    });
}
export { addListenToTabs, currentTab };
