<template>
    <uploader
        class="fb-uploader fb-element"
        :class="{'fb-uploader_disabled': isDisabled, 'fb-input_error': hasError, 'animated shake': shake}"
        :options="uploaderOptions"
        @file-added="checkFile"
        @file-progress="setProgress"
        @file-success="addFileNameToForm"
        @file-error="handleFileError"
    >
        <!--
            This blocks form when uploader is working (if needed)
            @upload-start="toggleFormBlock(true)"
            @complete="toggleFormBlock(false)"
        -->
        <uploader-unsupport></uploader-unsupport>

        <!-- dropzone -->
        <fb-error-wrap
            :open="showTooltip"
            :error="error"
            @clickTooltip="clickTooltip">
            <uploader-drop>
                <p class="fb-uploader__message">
                    {{ $lang.FORMS_UPLOAD_DROP }}
                    <span class="fb-uploader__fakebtn">{{ $lang.FORMS_UPLOAD_ADD }}</span>
                    <uploader-btn class="fb-uploader__btn" tabindex="1" ref="uploaderBtn"><span>{{ $lang.FORMS_UPLOAD_ADD }}</span></uploader-btn>
                </p>
                <p v-if="formatArray || size">
                    <i class="fb-uploader__formats" v-if="formatArray">
                        {{ $lang.FORMS_UPLOAD_FORMAT }} {{ formatString }}.
                    </i>
                    <i class="fb-uploader__size" v-if="size">
                        {{ $lang.FORMS_UPLOAD_SIZE }} {{ size }}Mb
                    </i>
                </p>
            </uploader-drop><!-- / dropzone -->
        </fb-error-wrap>
        <!-- files list -->
        <uploader-list>
            <template slot-scope="props">
                <slot name="list" :file-list="props.fileList" :remove-file="removeFile">
                    <div v-if="props.fileList.length" class="fb-uploader__cwrap">
                        <template v-if="modalFileListFormat">
                            <template v-for="(file, i) in props.fileList">
                                <div :key="file.id">
                                    <strong>{{ i + 1 }}.</strong>
                                    <span class="ml-8">{{ getName(file.name) }}.{{ getExtension(file.name) }}</span>
                                    <span class="cl-caption ml-8">({{ file.size | bytesToMb }})</span>
                                    <span class="ml-8" :class="{'cl-red': file.error}">
                                        <template v-if="file.isComplete()">
                                        {{ $lang[file.error ? 'FORMS_UPLOAD_ERROR' : 'FORMS_UPLOAD_DONE'] }}
                                        </template>
                                        <template v-else>
                                            {{ $lang.FORMS_UPLOAD_LOADING }}
                                        </template>
                                    </span>
                                    <button
                                        type="button"
                                        class="cl-red tf-size-small ml-10"
                                        :title="$lang.FORMS_UPLOAD_DELETE"
                                        :aria-label="$lang.FORMS_UPLOAD_DELETE"
                                        @click.prevent="removeFile(file, i)" ><i class="icon icon-cross"></i></button>

                                    <div v-if="!file.isComplete()" :key="file.id + 'loader'">
                                        <progress
                                            class="fb-uploader__progress"
                                            max="1"
                                            :value="filesProgress[file.uniqueIdentifier]">
                                        </progress>
                                    </div>
                                </div>
                            </template>
                        </template>
                        <template v-else>
                            <table class="fb-uploader__list">
                                <tbody>
                                <template v-for="(file, i) in props.fileList">
                                    <tr :key="file.id">
                                        <td class="fb-uploader__list-number">{{ i + 1 }}</td>
                                        <td class="fb-uploader__list-name">
                                            <span class="fb-uploader__list-ftitle">{{ getName(file.name) }}</span>
                                        </td>
                                        <td class="fb-uploader__list-type">{{ getExtension(file.name) }}</td>
                                        <td class="fb-uploader__list-size">{{ file.size | bytesToMb }}</td>
                                        <td class="fb-uploader__list-date">
                                            <template v-if="file.isComplete()">
                                                {{ _timestampToDate(file._lastProgressCallback) }}
                                            </template>
                                        </td>
                                        <td
                                            class="fb-uploader__list-status"
                                            :class="{'is-uploaded': !file.error && file.isComplete(), 'is-error': file.error, 'is-loading': !file.isComplete()}"
                                        >
                                            <template v-if="file.isComplete()">
                                                {{ $lang[file.error ? 'FORMS_UPLOAD_ERROR' : 'FORMS_UPLOAD_DONE'] }}
                                            </template>
                                            <template v-else>
                                                {{ $lang.FORMS_UPLOAD_LOADING }}
                                            </template>
                                        </td>
                                        <td class="fb-uploader__list-delete">
                                            <button
                                                type="button"
                                                class="fb-uploader__delete"
                                                :title="$lang.FORMS_UPLOAD_DELETE"
                                                :aria-label="$lang.FORMS_UPLOAD_DELETE"
                                                @click.prevent="removeFile(file, i)" >&times;</button>
                                        </td>
                                    </tr>
                                    <tr
                                        v-if="!file.isComplete()"
                                        :key="file.id + 'loader'"
                                        class="fb-uploader__list-pgwrap"
                                    >
                                        <td colspan="7" class="fb-uploader__list-progress">
                                            <progress
                                                class="fb-uploader__progress"
                                                max="1"
                                                :value="filesProgress[file.uniqueIdentifier]">
                                            </progress>
                                        </td>
                                    </tr>
                                </template>
                                </tbody>
                            </table>
                        </template>
                    </div>
                </slot>
            </template>
        </uploader-list><!-- / files list -->

    </uploader>
</template>

<script>
import fieldMixin from '../js/mixins/fb-field';

export default {

    name: 'fb-uploader',

    mixins: [ fieldMixin ],


    props: {

        url: {
            type: String,
            required: true
        },

        format: {
            type: [String, Array],
        },

        size: {
            type: [String, Number], // Mb
            default: 2,
            validator(value) {
                return +value == value
            }
        },

        modalFileListFormat: {
            type: Boolean,
            default: false
        },

        single: {
            type: Boolean,
            default: false
        },

        dateFormat: {
            type: String,
            default: 'DD.MM.YYYY'
        },

        value: {
            default: () => []
        }
    },


    data() {
        return {
            filesProgress: {}
        }
    },


    filters: {

        bytesToMb(val) {
            let mb = val / 1024 / 1024
            return ( mb < 1 ? mb.toFixed(3) : mb.toFixed(1) ) + 'Mb'
        }
    },


    computed: {

        uploaderOptions() {

            const token = this.AWEMA.utils.getMeta('csrf-token')

            return {
                target: this.url,
                singleFile: this.single,
                query: {
                    _token: token
                },
                headers: {
                    'X-CSRF-TOKEN': token,
                    'X-Requested-With': 'XMLHttpRequest',
                },
                testChunks: false
            }
        },

        formatArray() {
            if ( this.format && ! AWEMA.utils.object.isEmpty(this.format) ) {
                let _formatArray = Array.isArray(this.format) ? this.format.slice() : this.format.split(',')
                return _formatArray.map( extension => extension.replace(/\W/g, '') )
            }
        },

        formatString() {
            return this.formatArray && this.formatArray.map( extension => `*.${extension}`).join(', ')
        },

        maxSizeBytes() {
            return this.size * 1024 * 1024
        }
    },


    methods: {

        checkFile(file) {
            if ( this.formatArray && ! this._extensionMatch(file) ) {
                file.ignored = true
                this.$emit('error', this.$lang.FORMS_UPLOADER_EXTENSION_ERROR.replace('%s', file.name));
            }
            if ( this.size && file.size > this.maxSizeBytes ) {
                file.ignored = true
                this.$emit('error', this.$lang.FORMS_UPLOADER_SIZE_ERROR.replace('%s', file.name));
            }
            if ( ! file.ignored ) {
                this.$emit('added', file)
            }
        },

        setProgress(file) {
            this.$set(this.filesProgress, file.uniqueIdentifier, file.progress())
        },

        removeFileInProgress(file) {
            delete this.filesProgress[file.uniqueIdentifier]
        },

        getExtension(fileName) {
            return fileName.split('.').pop()
        },

        getName(fileName) {
            let name = fileName.split('.')
            name.pop()
            return name.join('.')
        },

        _extensionMatch(file) {
            let extension = this.getExtension(file.name)
            return this.formatArray.includes(extension)
        },

        _timestampToDate(val) {
            let date = this.$dayjs(val)
            return date.isValid() && date.format(this.dateFormat)
        },

        // This blocks form when uploader is working (if needed)
        // 
        // toggleFormBlock(status) {
        //     this.$store.commit('forms/setLoading', {
        //         formName: this.formId,
        //         status
        //     })
        //     if ( ! status ) this.$forceUpdate()
        // },

        addFileNameToForm(rootFile, file, message, chunk) {
            this.removeFileInProgress(file)
            try {
                let response = JSON.parse(message)
                let fileName = AWEMA.utils.object.get(response, 'meta.path', file.relativePath)
                Array.isArray(this.formValue) ? this.formValue.push(fileName) : this.formValue = [fileName]
                this.$emit('uploaded', file)
            } catch(e) {
                console.log(e);
            }
        },

        handleFileError(rootFile, file, message, chunk) {
            this.removeFileInProgress(file)
            this.$emit('error', message || this.$lang.FORMS_UPLOAD_ERROR)
            this.$forceUpdate()
        },

        removeFile(file, index) {
            this.removeFileInProgress(file)
            if ( ! file.error && file.isComplete() ) {
                this.formValue && this.formValue.splice(index, 1)
            }
            file.cancel()
        },

        setFocus(state) {
            this.__retries = this.__retries || 20
            try {
                let useMethod = (state !== false) ? 'focus' : 'blur';
                this.$refs.uploaderBtn.$el[useMethod]()
                this.__retries = 20
            } catch(e) {
                this.__retries -= 1
                if (this.__retries) {
                    setTimeout(() => this.setFocus(state), 1000)
                }
            }
        }
    }
}
</script>
