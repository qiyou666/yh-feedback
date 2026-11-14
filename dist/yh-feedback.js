/**
 * yh-feedback — 轻量反馈组件（无依赖）
 * 分类：UI / Feedback
 * 能力：Confirm Modal（确认对话框）+ Toast（角落轻提示）
 *
 * 用法：
 *   YhFeedback.toast('已保存', 'success')
 *   const ok = await YhFeedback.confirm({ title: '删除', content: '不可恢复', danger: true })
 */
(function (global) {
  'use strict';

  var PREFIX = 'yhfb';

  function ensureRoots() {
    var modalRoot = document.getElementById(PREFIX + '-modal-root');
    if (!modalRoot) {
      modalRoot = document.createElement('div');
      modalRoot.id = PREFIX + '-modal-root';
      document.body.appendChild(modalRoot);
    }
    var toastRoot = document.getElementById(PREFIX + '-toast-root');
    if (!toastRoot) {
      toastRoot = document.createElement('div');
      toastRoot.id = PREFIX + '-toast-root';
      toastRoot.setAttribute('aria-live', 'polite');
      document.body.appendChild(toastRoot);
    }
    return { modalRoot: modalRoot, toastRoot: toastRoot };
  }

  /**
   * @param {string} message
   * @param {'info'|'success'|'error'|'warn'} [type]
   */
  function toast(message, type) {
    type = type || 'info';
    var roots = ensureRoots();
    var el = document.createElement('div');
    el.className = PREFIX + '-toast ' + PREFIX + '-toast--' + type;
    el.innerHTML =
      '<span class="' + PREFIX + '-toast__dot"></span>' +
      '<span class="' + PREFIX + '-toast__text"></span>';
    el.querySelector('.' + PREFIX + '-toast__text').textContent = String(message || '');
    roots.toastRoot.appendChild(el);
    requestAnimationFrame(function () {
      el.classList.add('is-in');
    });
    setTimeout(function () {
      el.classList.remove('is-in');
      el.classList.add('is-out');
      setTimeout(function () {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 220);
    }, 2400);
  }

  /**
   * @param {object} [opts]
   * @param {string} [opts.title]
   * @param {string} [opts.content]
   * @param {string} [opts.okText]
   * @param {string} [opts.cancelText]
   * @param {boolean} [opts.danger]
   * @returns {Promise<boolean>}
   */
  function confirm(opts) {
    opts = opts || {};
    var title = opts.title || '请确认';
    var content = opts.content || '';
    var okText = opts.okText || '确定';
    var cancelText = opts.cancelText || '取消';
    var danger = !!opts.danger;

    return new Promise(function (resolve) {
      var roots = ensureRoots();
      roots.modalRoot.innerHTML =
        '<div class="' + PREFIX + '-modal-mask" data-yhfb-close="1">' +
        '  <div class="' + PREFIX + '-modal" role="dialog" aria-modal="true">' +
        '    <div class="' + PREFIX + '-modal__head">' +
        '      <div class="' + PREFIX + '-modal__title"></div>' +
        '      <button type="button" class="' + PREFIX + '-modal__x" data-yhfb-close="1" aria-label="关闭">×</button>' +
        '    </div>' +
        '    <div class="' + PREFIX + '-modal__body"></div>' +
        '    <div class="' + PREFIX + '-modal__foot">' +
        '      <button type="button" class="' + PREFIX + '-btn ' + PREFIX + '-btn--secondary" data-yhfb-close="1"></button>' +
        '      <button type="button" class="' + PREFIX + '-btn ' + PREFIX + '-modal__ok"></button>' +
        '    </div>' +
        '  </div>' +
        '</div>';

      var mask = roots.modalRoot.querySelector('.' + PREFIX + '-modal-mask');
      var modal = roots.modalRoot.querySelector('.' + PREFIX + '-modal');
      roots.modalRoot.querySelector('.' + PREFIX + '-modal__title').textContent = title;
      roots.modalRoot.querySelector('.' + PREFIX + '-modal__body').textContent = content;
      var cancelBtn = roots.modalRoot.querySelector('.' + PREFIX + '-modal__foot .' + PREFIX + '-btn--secondary');
      var okBtn = roots.modalRoot.querySelector('.' + PREFIX + '-modal__ok');
      cancelBtn.textContent = cancelText;
      okBtn.textContent = okText;
      if (danger) okBtn.classList.add(PREFIX + '-btn--danger');

      function close(result) {
        mask.classList.add('is-out');
        setTimeout(function () {
          roots.modalRoot.innerHTML = '';
          resolve(result);
        }, 160);
      }

      mask.addEventListener('click', function (e) {
        if (e.target && e.target.getAttribute('data-yhfb-close') === '1') {
          close(false);
        }
      });
      okBtn.addEventListener('click', function () {
        close(true);
      });

      requestAnimationFrame(function () {
        mask.classList.add('is-in');
        modal.classList.add('is-in');
      });
    });
  }

  var api = { toast: toast, confirm: confirm, version: '1.0.0' };
  global.YhFeedback = api;
  // 兼容旧别名（烟火云 DownstreamApiGuard 插件曾用 DagUI）
  if (!global.DagUI) global.DagUI = api;
})(typeof window !== 'undefined' ? window : this);
