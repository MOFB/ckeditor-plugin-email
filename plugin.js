/*
 * Email - CKeditor Plugin - v0.0.1
 * https://github.com/MOFB/ckeditor-plugin-email
 * Copyright (c) 2013 Master Of Bits, LLC. Licensed MIT
 */
CKEDITOR.plugins.add('email', {
	init: function(editor) {
        editor.addCommand('editEmailData',  new CKEDITOR.dialogCommand('editEmailDataDialog') );
        editor.ui.addButton('Email', {
            label:   'Email Data',
            command: 'editEmailData',
            icon:    this.path + 'images/email.png'
        });
	}
});
CKEDITOR.dialog.add('editEmailDataDialog', function(editor)
{
    return {
        title:     'Email Properties',
        minWidth:  400,
        minHeight: 200,
        contents:
        [
            {
                id :    'general',
                label : 'General',
                elements :
                [
                    {
                        type:   'html',
                        html:   '<p>The name will be used for internal purposes only. This will not be displayed publicly.</p>'
                    },
                    {
                        type:     'text',
                        id:       'name',
                        label:    'Name',
                        validate: CKEDITOR.dialog.validate.notEmpty('The page must have a valid name.'),
                        required: true
                    },
                    {
                        type:   'text',
                        id:     'subject',
                        label:  'Subject',
                        validate: CKEDITOR.dialog.validate.notEmpty('The page must have a valid subject.'),
                        required: true
                    },
                    {
                        type:   'text',
                        id:     'from',
                        label:  'From',
                        validate: CKEDITOR.dialog.validate.notEmpty('The email must have a valid from address.'),
                        required: true
                    },
                    {
                        type:   'html',
                        html:   '<p>If you have a different email address you would like replies to go to please provied it below.</p>'
                    },
                    {
                        type:   'text',
                        id:     'reply_to',
                        label:  'Reply To',
                    }
                ]
            },
            {
                id :    'plain_text',
                label : 'Plain Text',
                elements :
                [
                    {
                        type:   'html',
                        html:   '<p>This is the plain text version of the email.</p>'
                    },
                    {
                        type:     'textarea',
                        id:       'text_body',
                        label:    'Plain Text',
                        rows:    '10'
                    }
                ]
            }
        ],
        onOk: function () {
            var dia = this;
            $.each(['name','from','reply_to','subject'], function(i, name) {
                $('input[name="'+name+'"]').val(dia.getValueOf('general',  name));
                $('.ckeditor_info .'+name+' span').html( dia.getValueOf('general', name));
            });
            $('input[name="text_body"]').val(dia.getValueOf('plain_text', 'text_body'));
            $('.cke_button__save').removeClass('saved').addClass('not_saved');
            CKEDITOR_CHANGED = true;
            CKEDITOR_TAB = false;
        },
        onCancel: function () {
            CKEDITOR_TAB = false;
        },
        onShow: function () {
            var dia = this;
            $.each(['name','from','reply_to','subject'], function(i, name) {
                dia.setValueOf('general',  name, $('input[name="'+name+'"]').val());
            });
            dia.setValueOf('plain_text', 'text_body', $('input[name="text_body"]').val());
            if (CKEDITOR_TAB) {
                this.selectPage(CKEDITOR_TAB);
            }
        }
    };
});
