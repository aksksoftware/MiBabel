/* Polyfill Array.prototype.find para WebView antiguo */
if (typeof Array.prototype.find !== 'function') { Array.prototype.find = function(fn) { for (var i = 0; i < this.length; i++) { if (fn(this[i], i, this)) return this[i]; } }; }
/* Polyfill Element.closest para muy antiguos */
if (typeof Element.prototype.closest !== 'function') { Element.prototype.closest = function(s) { var el = this; do { if (el.matches(s)) return el; el = el.parentElement || el.parentNode; } while (el !== null); return null; }; }

var langData = {
  en: {
    notes:'Notes', diary:'Diary', board:'Board', boards:'Boards', studyCards:'Study Cards', settings:'Settings', rename:'Rename',
    newSet:'New Set', editSet:'Edit Set', deleteSet:'Delete Set', addCard:'Add Card',
    front:'Front', back:'Back', know:'Know', dontKnow:'Don\'t Know',
    noCards:'No cards yet', study:'Study', edit:'Edit', del:'Delete',
    setName:'Set name', enterSetName:'Enter set name', cardList:'Cards', backToSets:'Back to Sets', showAnswer:'Click to reveal',
    darkTheme:'Dark theme', lightTheme:'Light theme',
    cancel:'Cancel', create:'Create', confirm:'Confirm', close:'Close', understood:'Got it',
    newNote:'New Note', newBoard:'New Board', title:'Title', name:'Name',
    passwordOptional:'Password (optional)', enterPassword:'Enter password',
    protectedNote:'Protected note: ', protectedBoard:'Protected board: ',
    deleteNote:'Delete note: ', deleteBoard:'Delete board: ',
    noteInFavorites:'Note in favorites',
    unfavoriteToDelete:'You must remove it from favorites before deleting.',
    wrongPassword:'Incorrect password',
    addFav:'Add to favorites', removeFav:'Remove from favorites',
    exportPdf:'Export PDF', connect:'Connect',
     addItem:'Add item', addText:'Add text', insertImage:'Insert image', 
    addCover:'Add cover', removeCover:'Remove cover', coverTooLarge:'Image too large. Max 5MB.',
    bold:'Bold (Ctrl+B)', italic:'Italic (Ctrl+I)', underline:'Underline (Ctrl+U)', highlight:'Highlight', bulletList:'Bullet list', numberedList:'Numbered list',
    bg:'Bg', postit:'Post-it', cork:'Cork', white:'White', black:'Black', green:'Green (board)', exportToPdf:'Export to PDF', export:'Export', studyCards:'Study Cards', resetZoom:'Reset zoom',
    noteTitlePlaceholder:'Note title', boardNamePlaceholder:'Board name', leaveEmpty:'Leave empty if no password',
    passwordProtected:'Password protected', noContent:'No content',
    noNotes:'No notes yet.', noBoards:'No boards yet.', noDiaryEntries:'No diary entries.',
    newNoteLabel:'New note', newBoardLabel:'New board',
    addItemsPrompt:'Add items to your note',
    textPlaceholder:'Write your text here...', itemPlaceholder:'Write here...',
    back:'Back', selectNote:'Select or create a note', selectBoard:'Select or create a board',
    exported:'Exported: ', printError:'Error printing', processingExport:'Your note is being processed',
    needPostits:'Need at least 2 post-its',
    insertEquation:'Insert equation', equationEditor:'Equation editor', save:'Save',
    equationError:'Equation contains errors', editEquation:'Edit equation',
    latexPreview:'Preview', boardInsertEquation:'Insert equation', equationPlaceholder:'Write LaTeX here...',
    clickDestiny:'Click on destination post-it',
    connectionCreated:'Connection created', connectionExists:'Connection already exists',
    chooseOther:'Choose another post-it',
    diarySection:'Diary', language:'Language',
    cafecitoDesc:'The Library of Babel is infinite. The resources to develop it are not. If MiBabel is useful to you, you can help keep building it.',
    libro:'A book', estante:'A shelf', galeria:'A gallery', salaBabel:'A Babel room',
    trash:'Trash', trashEmpty:'Trash is empty.', trashSubtitle:'Deleted items are automatically removed after 30 days.',
    restore:'Restore', deletePermanent:'Delete', confirmDeletePermanent:'Delete permanently?',
    trashDaysLeft:'Deleted in ', trashDaysUnit:' day(s)', trashDeletedSoon:'Will be deleted soon',
    trashTypeNote:'Note', trashTypeBoard:'Board', trashTypeStudySet:'Study Cards',
    linkHelpTitle:'Links between notes & URLs', linkToNote:'Links to another note', linkToUrl:'Links to an external URL',
    diaryPwdLabel:'Diary password', diaryPwdSet:'\uD83D\uDD12 Password set', diaryPwdChange:'Change', diaryPwdRemove:'Remove', diaryPwdNone:'No password', diaryPwdSetBtn:'Set',
    diaryPwdSetTitle:'Set diary password', diaryPwdChangeTitle:'Change diary password', diaryPwdRemoveTitle:'Remove diary password',
    diaryPwdOldLabel:'Current password', diaryPwdNewLabel:'New password',
    diaryPwdAlertEmpty:'Enter a password.', diaryPwdAlertWrong:'Current password is incorrect.', diaryPwdAlertNewEmpty:'Enter the new password.',
    diaryProtected:'Diary notes are protected', diaryForgotPwd:'Forgot password?',
    recoveryPrompt:'Enter your recovery code:', recoveryWrong:'Incorrect code.',
    recoveryDialogTitle:'Recovery code', recoveryDialogMsg:'Save this code in a safe place. If you forget your password, you can use it to recover access to your diary notes.', recoveryDialogBtn:'I saved it',
    migrateLabel:'Migrate data', exportBtn:'Export data', importBtn:'Import data',
    save:'Save', preview:'Preview:', insert:'Insert', newSetTitle:'New Set',
    insertTable:'Table', mergeCells:'Merge', splitCell:'Split', alignLeft:'Left', alignCenter:'Center', alignRight:'Right', alignJustify:'Justify', tableRows:'Rows', tableCols:'Columns', createTable:'Create',
    months:['January','February','March','April','May','June','July','August','September','October','November','December'],
    dayAbbr:['Su','Mo','Tu','We','Th','Fr','Sa'],
    searchDate:'Search date (dd/mm/yyyy)',
    checkDownloads:'Check your Downloads folder',
    welcomeTitle:'Welcome to MiBabel',
    welcomeMsg:'Welcome to MiBabel, an independent project created by me, a student passionate about knowledge.<br><br>MiBabel was born mainly thinking of students. Thanks to its simplicity and its various tools, it seeks to become a study and organization companion. However, it is open to anyone who wishes to organize their ideas, projects and learning.<br><br>Its name is inspired by &quot;The Library of Babel&quot;, the famous story by Argentine writer and poet Jorge Luis Borges, which imagines an infinite library capable of containing all possible books.<br><br><i>&quot;The Library is a sphere whose exact center is any hexagon, whose circumference is inaccessible.&quot;</i><br><br>Excerpt from &quot;The Library of Babel&quot;, by Jorge Luis Borges.<br><br>MiBabel is a free, private application designed to be useful. If you find it valuable, you can contribute to its development and help this library continue to grow.',
    milestoneMsg:'If MiBabel is useful to you, I invite you to contribute so this library can keep growing.',
    milestoneBtn:'Not now',
     event:'Event', task:'Task', remindMe:'Remind me',
     everyWeek:'Every week', everyMonth:'Every month', everyYear:'Every year', everyDay:'Every day', time:'Time', testNotif:'Test notification', testNotifSent:'Notification scheduled for 15 seconds', testNotifDenied:'Notifications are disabled. Enable them in system settings.', testNotifUnsupported:'Notifications are not available here.', testNotifBody:'Test notification',
     noRepeat:'No repeat', pending:'Pending', completed:'Completed', type:'Type', repeat:'Repeat',
     insertAudio:'Insert audio', insertVideo:'Insert video',
     insertBoardImage:'Insert image', insertBoardAudio:'Insert audio', insertBoardVideo:'Insert video',
      audio:'Audio', video:'Video', fullsize:'Full size', modify:'Modify',
     duplicate:'Duplicate', sendToFront:'Bring to front', sendToBack:'Send to back',
      copyPaste:'Copy', paste:'Paste',
      insertEquation:'Insert equation', equationEditor:'Equation editor',
      equationError:'Equation contains errors', editEquation:'Edit equation',
      latexPreview:'Preview', boardInsertEquation:'Insert equation', equationPlaceholder:'Write LaTeX here...',
      stats:'Statistics', about:'About', totalNotes:'Total notes', totalBoards:'Total boards',
      totalStudySets:'Total study sets', totalPostits:'Total post-its', totalReminders:'Total reminders',
      totalWords:'Total words', versionLabel:'Version', licenses:'Licenses', changelog:'Changelog',
      developer:'Developer', contact:'Contact', privacy:'Privacy', boardNoShadows:'Hide shadows', reduceMotion:'Reduce motion',
      weekStartsMonday:'Week starts on Monday', defaultBoardBg:'Default board background',
      boardBgLabel:'Board background', boardShadowsLabel:'Show post-it shadows',
      boardAnimationsLabel:'Show animations', showStats:'Statistics', showAbout:'About',
      monday:'Monday', sunday:'Sunday',
      import:'Import', importSuccess:'Item imported successfully',
      invalidFile:'Invalid or corrupted file',
      uuidConflict:'An item with this ID already exists. A new ID will be generated.',
      exportNote:'Export as note', exportBoard:'Export as board', exportStudySet:'Export as card set',
      habits:'Habits', habitsPending:'Habits', habitsCompleted:'Completed habits', habitTask:'Task habit', habitCounter:'Counter habit',
      habitName:'Name', habitDesc:'Description', habitIcon:'Icon', habitColor:'Color', habitTotal:'Goal', habitStep:'Step',
      habitStreak:'Streak', resetToday:'Reset today', editHabit:'Edit', deleteHabit:'Delete',
      confirmDeleteHabit:'Delete this habit?', habitNameRequired:'Name is required.', habitTotalInvalid:'Goal must be a number greater than 0.', habitStepInvalid:'Step must be a number greater than 0 and not greater than goal.', habitStepIncoherent:'Step must allow reaching the goal exactly (goal must be divisible by step).', createHabit:'Create', habitEmpty:'No habits yet. Tap + to create one.', habitNeedsTotal:'Goal and Step are required for counter habits.', habitCreateTitle:'New habit', habitEditTitle:'Edit habit',
      registros:'Records', registrosEmpty:'No records yet. Tap + to create one.', newRegistro:'New Record', editRegistro:'Edit Record', deleteRegistro:'Delete Record', registroName:'Name', addVariable:'Add variable', noRegistros:'No records yet.', confirmDeleteRegistro:'Delete this record?', confirmDeleteVariable:'Delete this variable?', registroNameRequired:'Name is required.', registroExists:'A record with this name already exists.', variableExists:'A variable with this name already exists.', invalidRegistroName:'Invalid name. Use letters, numbers and underscore, starting with letter or underscore.', variableNameRequired:'Variable name is required.', invalidType:'Invalid type.', variableType:'Type', registroCreateTitle:'New record', registroEditTitle:'Edit record', registroDeleteMsg:'All variables and history will be deleted. This cannot be undone.', exportRegistro:'Export record', importRegistro:'Import record', typeInt:'int', typeFloat:'float', typeBool:'bool', typeTexto:'texto', totalRegistros:'Total records', fromDate:'From', toDate:'To', clearFilter:'Clear', invalidDate:'Invalid date.', invalidRange:'Invalid range.', valueMismatch:'Value does not match type.', registroNotFound:'Record not found.', variableNotFound:'Variable not found.', trashTypeRegistro:'Record', folder:'Folder', folders:'Folders', newFolder:'New Folder', newFolderLabel:'New folder', folderName:'Folder name', folderNamePlaceholder:'Folder name', protectedFolder:'Protected folder: ', deleteFolder:'Delete folder: ', deleteFolderMsg:'The {n} notes inside will be moved to the main view.', deleteFolderEmpty:'The folder is empty.', emptyFolderHint:'This folder is empty. Tap + to create a note inside.', subfoldersNotAllowed:'Subfolders are not allowed.', moveToFolder:'Move to folder', moveToNotes:'Move to Notes', changePassword:'Change password', invalidFolder:'Invalid folder.', enterFolderId:'Enter folder ID:', countNote:'note', countNotes:'notes', renameFolder:'Rename folder', folderExists:'Folder already exists'
    },
   es: {
    notes:'Notas', diary:'Diario', board:'Tablero', boards:'Tableros', studyCards:'Tarjetas de estudio', settings:'Ajustes', rename:'Renombrar',
    newSet:'Nuevo conjunto', editSet:'Editar conjunto', deleteSet:'Eliminar conjunto', addCard:'Agregar tarjeta',
    front:'Frente', back:'Reverso', know:'Sabia', dontKnow:'No sabia',
    noCards:'Sin tarjetas aun', study:'Estudiar', edit:'Editar', del:'Eliminar',
    setName:'Nombre del conjunto', enterSetName:'Ingrese nombre del conjunto', cardList:'Tarjetas', backToSets:'Volver a conjuntos', showAnswer:'Clic para ver respuesta',
    darkTheme:'Tema oscuro', lightTheme:'Tema claro',
    cancel:'Cancelar', create:'Crear', confirm:'Confirmar', close:'Cerrar', understood:'Entendido',
    newNote:'Nueva Nota', newBoard:'Nuevo Tablero', title:'Titulo', name:'Nombre',
    passwordOptional:'Contrasena (opcional)', enterPassword:'Ingresar contrasena',
    protectedNote:'Nota protegida: ', protectedBoard:'Tablero protegido: ',
    deleteNote:'Eliminar nota: ', deleteBoard:'Eliminar tablero: ',
    noteInFavorites:'Nota en favoritos',
    unfavoriteToDelete:'Debes descartarla de favoritos antes de eliminarla.',
    wrongPassword:'Contrasena incorrecta',
    addFav:'Anadir a favoritos', removeFav:'Quitar de favoritos',
    exportPdf:'Exportar PDF', connect:'Conectar',
     addItem:'Anadir item', addText:'Anadir texto', insertImage:'Insertar imagen',
    addCover:'Anadir caratula', removeCover:'Quitar caratula', coverTooLarge:'Imagen demasiado grande. Max 5MB.',
    bold:'Negrita (Ctrl+B)', italic:'Cursiva (Ctrl+I)', underline:'Subrayado (Ctrl+U)', highlight:'Resaltar', bulletList:'Lista con viñetas', numberedList:'Lista numerada',
    bg:'Fondo', postit:'Post-it', cork:'Corcho', white:'Blanco', black:'Negro', green:'Verde (pizarron)', exportToPdf:'Exportar a PDF', export:'Exportar', studyCards:'Tarjetas de estudio', resetZoom:'Restablecer zoom',
    noteTitlePlaceholder:'Titulo de la nota', boardNamePlaceholder:'Nombre del tablero', leaveEmpty:'Dejar vacio si no quiere',
    passwordProtected:'Protegido con contrasena', noContent:'Sin contenido',
    noNotes:'Todavia no hay notas.', noBoards:'Todavia no hay tableros.', noDiaryEntries:'No hay entradas en el diario.',
    newNoteLabel:'Nueva nota', newBoardLabel:'Nuevo tablero',
    addItemsPrompt:'Agrega items a tu nota',
    textPlaceholder:'Escribe tu texto aqui...', itemPlaceholder:'Escribe aqui...',
    back:'Volver', selectNote:'Selecciona o crea una nota', selectBoard:'Selecciona o crea un tablero',
    exported:'Exportado: ', printError:'Error al imprimir', processingExport:'Su nota est\u00e1 siendo procesada',
    needPostits:'Se necesitan al menos 2 post-its',
    clickDestiny:'Click en el post-it destino',
    connectionCreated:'Conexion creada', connectionExists:'Ya existe esa conexion',
    chooseOther:'Elige otro post-it',
    diarySection:'Diario', language:'Idioma',
    cafecitoDesc:'La Biblioteca de Babel es infinita. Los recursos para desarrollarla no. Si MiBabel te resulta \u00fatil, pod\u00e9s ayudar a seguir construy\u00e9ndola.',
    libro:'Un libro', estante:'Un estante', galeria:'Una galer\u00eda', salaBabel:'Una sala de Babel',
    trash:'Papelera', trashEmpty:'La papelera est\u00e1 vac\u00eda.', trashSubtitle:'Los elementos eliminados se borran autom\u00e1ticamente despu\u00e9s de 30 d\u00edas.',
    restore:'Restaurar', deletePermanent:'Eliminar', confirmDeletePermanent:'\u00bfEliminar permanentemente?',
    trashDaysLeft:'Se elimina en ', trashDaysUnit:' d\u00eda(s)', trashDeletedSoon:'Se eliminar\u00e1 pronto',
    trashTypeNote:'Nota', trashTypeBoard:'Tablero', trashTypeStudySet:'Tarjetas de estudio',
    linkHelpTitle:'Enlaces entre notas y URLs', linkToNote:'Vincula a otra nota', linkToUrl:'Vincula a una URL externa',
    diaryPwdLabel:'Contrase\u00f1a del diario', diaryPwdSet:'\uD83D\uDD12 Contrase\u00f1a establecida', diaryPwdChange:'Cambiar', diaryPwdRemove:'Eliminar', diaryPwdNone:'Sin contrase\u00f1a', diaryPwdSetBtn:'Establecer',
    diaryPwdSetTitle:'Establecer contrase\u00f1a del diario', diaryPwdChangeTitle:'Cambiar contrase\u00f1a del diario', diaryPwdRemoveTitle:'Eliminar contrase\u00f1a del diario',
    diaryPwdOldLabel:'Contrase\u00f1a actual', diaryPwdNewLabel:'Nueva contrase\u00f1a',
    diaryPwdAlertEmpty:'Ingresa una contrase\u00f1a.', diaryPwdAlertWrong:'Contrase\u00f1a actual incorrecta.', diaryPwdAlertNewEmpty:'Ingresa la nueva contrase\u00f1a.',
    diaryProtected:'Notas diarias protegidas', diaryForgotPwd:'\u00bfOlvidaste la contrase\u00f1a?',
    recoveryPrompt:'Ingresa tu c\u00f3digo de recuperaci\u00f3n:', recoveryWrong:'C\u00f3digo incorrecto.',
    recoveryDialogTitle:'C\u00f3digo de recuperaci\u00f3n', recoveryDialogMsg:'Guarda este c\u00f3digo en un lugar seguro. Si olvidas tu contrase\u00f1a, podr\u00e1s usarlo para recuperar el acceso a tus notas diarias.', recoveryDialogBtn:'Ya lo guard\u00e9',
    migrateLabel:'Migrar datos', exportBtn:'Exportar datos', importBtn:'Importar datos',
    save:'Guardar', preview:'Vista previa:', insert:'Insertar', newSetTitle:'Nuevo Conjunto',
    insertTable:'Tabla', mergeCells:'Fusionar', splitCell:'Dividir', alignLeft:'Izquierda', alignCenter:'Centro', alignRight:'Derecha', alignJustify:'Justificar', tableRows:'Filas', tableCols:'Columnas', createTable:'Crear',
    months:['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
    dayAbbr:['Do','Lu','Ma','Mi','Ju','Vi','Sa'],
    searchDate:'Buscar fecha (dd/mm/aaaa)',
    checkDownloads:'Revisa la carpeta de Descargas',
    welcomeTitle:'Bienvenido a MiBabel',
    welcomeMsg:'Te doy la bienvenida a MiBabel, un proyecto independiente creado por m\u00ed, un estudiante apasionado por el conocimiento.<br><br>MiBabel naci\u00f3 principalmente pensando para estudiantes. Gracias a su simplicidad y a sus diversas herramientas, busca convertirse en una compa\u00f1era de estudio y organizaci\u00f3n. Sin embargo, est\u00e1 abierta a cualquier persona que desee ordenar sus ideas, proyectos y aprendizajes.<br><br>Su nombre est\u00e1 inspirado en \u00abLa biblioteca de Babel\u00bb, el c\u00e9lebre cuento del escritor y poeta argentino Jorge Luis Borges, que imagina una biblioteca infinita capaz de contener todos los libros posibles.<br><br><i>\u00abLa Biblioteca es una esfera cuyo centro cabal es cualquier hex\u00e1gono, cuya circunferencia es inaccesible.\u00bb</i><br><br>Fragmento de \u00abLa biblioteca de Babel\u00bb, de Jorge Luis Borges.<br><br>MiBabel es una aplicaci\u00f3n gratuita, privada y dise\u00f1ada para ser \u00fatil. Si te resulta valiosa, pod\u00e9s contribuir a su desarrollo y ayudar a que esta biblioteca siga creciendo.',
    milestoneMsg:'Si te est\u00e1 resultando \u00fatil MiBabel, te invito a contribuir para que esta biblioteca siga creciendo.',
    milestoneBtn:'Ahora no',
      event:'Evento', task:'Tarea', remindMe:'Recuérdame',
      everyWeek:'Cada semana', everyMonth:'Cada mes', everyYear:'Cada año', everyDay:'Todos los días', time:'Hora', testNotif:'Probar notificación', testNotifSent:'Notificación programada para 15 segundos', testNotifDenied:'Las notificaciones están desactivadas. Actívalas en los ajustes del sistema.', testNotifUnsupported:'Las notificaciones no están disponibles aquí.', testNotifBody:'Notificación de prueba',
      noRepeat:'Sin repetición', pending:'Pendiente', completed:'Completada', type:'Tipo', repeat:'Repetición',
      insertAudio:'Insertar audio', insertVideo:'Insertar video',
      insertBoardImage:'Insertar imagen', insertBoardAudio:'Insertar audio', insertBoardVideo:'Insertar video',
      audio:'Audio', video:'Video', fullsize:'Tamaño completo', modify:'Modificar',
     duplicate:'Duplicar', sendToFront:'Enviar al frente', sendToBack:'Enviar al fondo',
      copyPaste:'Copiar', paste:'Pegar',
      insertEquation:'Insertar ecuaci\u00f3n', equationEditor:'Editor de ecuaci\u00f3n',
      equationError:'La ecuaci\u00f3n contiene errores', editEquation:'Editar ecuaci\u00f3n',
      latexPreview:'Vista previa', boardInsertEquation:'Insertar ecuaci\u00f3n', equationPlaceholder:'Escribe LaTeX aqu\u00ed...',
      stats:'Estad\u00edsticas', about:'Acerca de', totalNotes:'Total de notas', totalBoards:'Total de tableros',
      totalStudySets:'Total de conjuntos', totalPostits:'Total de post-its', totalReminders:'Total de recordatorios',
      totalWords:'Total de palabras', versionLabel:'Versi\u00f3n', licenses:'Licencias', changelog:'Registro de cambios',
      developer:'Desarrollador', contact:'Contacto', privacy:'Privacidad', boardNoShadows:'Ocultar sombras', reduceMotion:'Reducir movimiento',
      weekStartsMonday:'La semana empieza el lunes', defaultBoardBg:'Fondo de tablero predeterminado',
      boardBgLabel:'Fondo del tablero', boardShadowsLabel:'Mostrar sombras en post-its',
      boardAnimationsLabel:'Mostrar animaciones', showStats:'Estad\u00edsticas', showAbout:'Acerca de',
      monday:'Lunes', sunday:'Domingo',
      import:'Importar', importSuccess:'Elemento importado correctamente',
      invalidFile:'Archivo inv\u00e1lido o corrupto',
      uuidConflict:'Ya existe un elemento con este ID. Se generar\u00e1 un nuevo ID.',
      exportNote:'Exportar como nota', exportBoard:'Exportar como tablero', exportStudySet:'Exportar como set',
      habits:'Hábitos', habitsPending:'Hábitos', habitsCompleted:'Hábitos completos', habitTask:'Hábito tarea', habitCounter:'Hábito contador',
      habitName:'Nombre', habitDesc:'Descripción', habitIcon:'Ícono', habitColor:'Color', habitTotal:'Total', habitStep:'Saltos',
      habitStreak:'Racha', resetToday:'Resetear hoy', editHabit:'Editar', deleteHabit:'Eliminar',
      confirmDeleteHabit:'¿Eliminar este hábito?', habitNameRequired:'El nombre es obligatorio.', habitTotalInvalid:'El total debe ser un número mayor que 0.', habitStepInvalid:'Los saltos deben ser un número mayor que 0 y no mayor que el total.', habitStepIncoherent:'Los saltos deben permitir alcanzar el total de forma coherente (el total debe ser divisible por los saltos).', createHabit:'Crear', habitEmpty:'Aún no hay hábitos. Pulsa + para crear uno.', habitNeedsTotal:'Total y Saltos son obligatorios para hábitos contador.', habitCreateTitle:'Nuevo hábito', habitEditTitle:'Editar hábito',
      registros:'Registros', registrosEmpty:'Aún no hay registros. Pulsa + para crear uno.', newRegistro:'Nuevo Registro', editRegistro:'Editar Registro', deleteRegistro:'Eliminar Registro', registroName:'Nombre', addVariable:'Agregar variable', noRegistros:'Aún no hay registros.', confirmDeleteRegistro:'¿Eliminar este registro?', confirmDeleteVariable:'¿Eliminar esta variable?', registroNameRequired:'El nombre es obligatorio.', registroExists:'Ya existe un registro con ese nombre.', variableExists:'Ya existe una variable con ese nombre.', invalidRegistroName:'Nombre inválido. Usa letras, números y guión bajo, empezando por letra o guión bajo.', variableNameRequired:'El nombre de la variable es obligatorio.', invalidType:'Tipo inválido.', variableType:'Tipo', registroCreateTitle:'Nuevo registro', registroEditTitle:'Editar registro', registroDeleteMsg:'Se eliminarán todas sus variables y su historial. Esta acción no se puede deshacer.', exportRegistro:'Exportar registro', importRegistro:'Importar registro', typeInt:'int', typeFloat:'float', typeBool:'bool', typeTexto:'texto', totalRegistros:'Total registros', fromDate:'Desde', toDate:'Hasta', clearFilter:'Limpiar', invalidDate:'Fecha inválida.', invalidRange:'Rango inválido.', valueMismatch:'El valor no coincide con el tipo.', registroNotFound:'Registro no encontrado.', variableNotFound:'Variable no encontrada.', trashTypeRegistro:'Registro', folder:'Carpeta', folders:'Carpetas', newFolder:'Nueva Carpeta', newFolderLabel:'Nueva carpeta', folderName:'Nombre de la carpeta', folderNamePlaceholder:'Nombre de la carpeta', protectedFolder:'Carpeta protegida: ', deleteFolder:'Eliminar carpeta: ', deleteFolderMsg:'Las {n} Notas contenidas serán movidas a la vista principal.', deleteFolderEmpty:'La carpeta está vacía.', emptyFolderHint:'Esta carpeta está vacía. Pulsa + para crear una nota dentro.', subfoldersNotAllowed:'No se permiten subcarpetas.', moveToFolder:'Mover a carpeta', moveToNotes:'Mover a Notas', changePassword:'Cambiar contraseña', invalidFolder:'Carpeta inválida.', enterFolderId:'Ingrese ID de la carpeta:', countNote:'nota', countNotes:'notas', renameFolder:'Renombrar carpeta', folderExists:'Ya existe una carpeta con ese nombre'
    },
   fr: {
    notes:'Notes', diary:'Journal', board:'Tableau', boards:'Tableaux', studyCards:'Cartes memoire', settings:'Parametres', rename:'Renommer',
    newSet:'Nouvel ensemble', editSet:'Modifier', deleteSet:'Supprimer', addCard:'Ajouter carte',
    front:'Recto', back:'Verso', know:'Su', dontKnow:'Pas su',
    noCards:'Aucune carte', study:'Etudier', edit:'Editer', del:'Supprimer',
    setName:'Nom', enterSetName:'Entrez le nom', cardList:'Cartes', backToSets:'Retour', showAnswer:'Cliquez pour voir',
    darkTheme:'Theme sombre', lightTheme:'Theme clair',
    cancel:'Annuler', create:'Creer', confirm:'Confirmer', close:'Fermer', understood:'Compris',
    newNote:'Nouvelle Note', newBoard:'Nouveau Tableau', title:'Titre', name:'Nom',
    passwordOptional:'Mot de passe (optionnel)', enterPassword:'Entrer le mot de passe',
    protectedNote:'Note protegee: ', protectedBoard:'Tableau protege: ',
    deleteNote:'Supprimer la note: ', deleteBoard:'Supprimer le tableau: ',
    noteInFavorites:'Note dans les favoris',
    unfavoriteToDelete:'Retirez-la des favoris avant de supprimer.',
    wrongPassword:'Mot de passe incorrect',
    addFav:'Ajouter aux favoris', removeFav:'Retirer des favoris',
    exportPdf:'Exporter en PDF', connect:'Connecter',
     addItem:'Ajouter element', addText:'Ajouter texte', insertImage:'Insérer image', voiceNote:'Note vocale',
    addCover:'Ajouter couverture', removeCover:'Supprimer couverture', coverTooLarge:'Image trop grande. Max 5Mo.',
    bold:'Gras (Ctrl+B)', italic:'Italique (Ctrl+I)', underline:'Souligne (Ctrl+U)', highlight:'Surligner', bulletList:'Liste à puces', numberedList:'Liste numérotée',
    bg:'Fond', postit:'Post-it', cork:'Liege', white:'Blanc', black:'Noir', green:'Vert (tableau)', exportToPdf:'Exporter en PDF', export:'Exporter', studyCards:'Cartes de r\u00E9vision', resetZoom:'R\u00E9initialiser le zoom',
    noteTitlePlaceholder:'Titre de la note', boardNamePlaceholder:'Nom du tableau', leaveEmpty:'Laisser vide si pas de mot de passe',
    passwordProtected:'Protege par mot de passe', noContent:'Pas de contenu',
    noNotes:'Pas encore de notes.', noBoards:'Pas encore de tableaux.', noDiaryEntries:'Aucune entr\u00e9e dans le journal.',
    newNoteLabel:'Nouvelle note', newBoardLabel:'Nouveau tableau',
    addItemsPrompt:'Ajoutez des elements a votre note',
    textPlaceholder:'Ecrivez votre texte ici...', itemPlaceholder:'Ecrivez ici...',
    back:'Retour', selectNote:'Selectionnez ou creez une note',
    selectBoard:'Selectionnez ou creez un tableau',
    exported:'Exporte: ', printError:'Erreur d\'impression', processingExport:'Votre note est en cours de traitement',
    needPostits:'Au moins 2 post-its necessaires',
    clickDestiny:'Cliquez sur le post-it de destination',
    connectionCreated:'Connexion creee', connectionExists:'Cette connexion existe deja',
    chooseOther:'Choisissez un autre post-it',
    diarySection:'Journal', language:'Langue',
    cafecitoDesc:'La Bibliotheque de Babel est infinie. Les ressources pour la developper ne le sont pas. Si MiBabel vous est utile, vous pouvez aider a continuer a la construire.',
    libro:'Un livre', estante:'Une etagere', galeria:'Une galerie', salaBabel:'Une salle de Babel',
    trash:'Corbeille', trashEmpty:'La corbeille est vide.', trashSubtitle:'Les \u00e9l\u00e9ments supprim\u00e9s sont automatiquement effac\u00e9s apr\u00e8s 30 jours.',
    restore:'Restaurer', deletePermanent:'Supprimer', confirmDeletePermanent:'Supprimer d\u00e9finitivement\u00a0?',
    trashDaysLeft:'Supprim\u00e9 dans ', trashDaysUnit:' jour(s)', trashDeletedSoon:'Sera bient\u00f4t supprim\u00e9',
    trashTypeNote:'Note', trashTypeBoard:'Tableau', trashTypeStudySet:'Cartes m\u00e9moire',
    linkHelpTitle:'Liens entre notes & URL', linkToNote:'Lien vers une autre note', linkToUrl:'Lien vers une URL externe',
    diaryPwdLabel:'Mot de passe du journal', diaryPwdSet:'\uD83D\uDD12 Mot de passe d\u00e9fini', diaryPwdChange:'Modifier', diaryPwdRemove:'Supprimer', diaryPwdNone:'Pas de mot de passe', diaryPwdSetBtn:'D\u00e9finir',
    diaryPwdSetTitle:'D\u00e9finir le mot de passe du journal', diaryPwdChangeTitle:'Modifier le mot de passe du journal', diaryPwdRemoveTitle:'Supprimer le mot de passe du journal',
    diaryPwdOldLabel:'Mot de passe actuel', diaryPwdNewLabel:'Nouveau mot de passe',
    diaryPwdAlertEmpty:'Entrez un mot de passe.', diaryPwdAlertWrong:'Mot de passe actuel incorrect.', diaryPwdAlertNewEmpty:'Entrez le nouveau mot de passe.',
    diaryProtected:'Les notes du journal sont prot\u00e9g\u00e9es', diaryForgotPwd:'Mot de passe oubli\u00e9 ?',
    recoveryPrompt:'Entrez votre code de r\u00e9cup\u00e9ration :', recoveryWrong:'Code incorrect.',
    recoveryDialogTitle:'Code de r\u00e9cup\u00e9ration', recoveryDialogMsg:'Conservez ce code en lieu s\u00fbr. Si vous oubliez votre mot de passe, vous pourrez l\u2019utiliser pour r\u00e9cup\u00e9rer l\u2019acc\u00e8s \u00e0 vos notes du journal.', recoveryDialogBtn:'Je l\u2019ai sauvegard\u00e9',
    migrateLabel:'Migrer les donn\u00e9es', exportBtn:'Exporter les donn\u00e9es', importBtn:'Importer les donn\u00e9es',
    save:'Enregistrer', preview:'Aper\u00e7u:', insert:'Ins\u00e9rer', newSetTitle:'Nouvel ensemble',
    insertTable:'Tableau', mergeCells:'Fusionner', splitCell:'Diviser', alignLeft:'Gauche', alignCenter:'Centre', alignRight:'Droite', alignJustify:'Justifier', tableRows:'Lignes', tableCols:'Colonnes', createTable:'Cr\u00e9er',
    months:['Janvier','Fevrier','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Decembre'],
    dayAbbr:['Di','Lu','Ma','Me','Je','Ve','Sa'],
    searchDate:'Rechercher une date (jj/mm/aaaa)',
    checkDownloads:'Consultez votre dossier Téléchargements',
    welcomeTitle:'Bienvenue sur MiBabel',
    welcomeMsg:'Je vous souhaite la bienvenue dans MiBabel, un projet ind\u00e9pendant cr\u00e9\u00e9 par moi, un \u00e9tudiant passionn\u00e9 par le savoir.<br><br>MiBabel est n\u00e9 principalement pour les \u00e9tudiants. Gr\u00e2ce \u00e0 sa simplicit\u00e9 et \u00e0 ses divers outils, il cherche \u00e0 devenir un compagnon d\u2019\u00e9tude et d\u2019organisation. Cependant, il est ouvert \u00e0 toute personne souhaitant organiser ses id\u00e9es, projets et apprentissages.<br><br>Son nom est inspir\u00e9 de \u00ab\u00a0La Biblioth\u00e8que de Babel\u00a0\u00bb, la c\u00e9l\u00e8bre nouvelle de l\u2019\u00e9crivain et po\u00e8te argentin Jorge Luis Borges, qui imagine une biblioth\u00e8que infinie capable de contenir tous les livres possibles.<br><br><i>\u00ab\u00a0La Biblioth\u00e8que est une sph\u00e8re dont le centre exact est un hexagone quelconque, et dont la circonf\u00e9rence est inaccessible.\u00a0\u00bb</i><br><br>Extrait de \u00ab\u00a0La Biblioth\u00e8que de Babel\u00a0\u00bb, de Jorge Luis Borges.<br><br>MiBabel est une application gratuite, priv\u00e9e et con\u00e7ue pour \u00eatre utile. Si elle vous est pr\u00e9cieuse, vous pouvez contribuer \u00e0 son d\u00e9veloppement et aider cette biblioth\u00e8que \u00e0 continuer de grandir.',
    milestoneMsg:'Si MiBabel vous est utile, je vous invite \u00e0 contribuer pour que cette biblioth\u00e8que continue de grandir.',
    milestoneBtn:'Pas maintenant',
     event:'Événement', task:'Tâche', remindMe:'Me rappeler',
    everyWeek:'Chaque semaine', everyMonth:'Chaque mois', everyYear:'Chaque année', everyDay:'Tous les jours', time:'Heure', testNotif:'Tester la notification', testNotifSent:'Notification programmée dans 15 secondes', testNotifDenied:'Les notifications sont désactivées. Activez-les dans les paramètres système.', testNotifUnsupported:'Les notifications ne sont pas disponibles ici.', testNotifBody:'Notification de test',
    noRepeat:'Sans répétition', pending:'En attente', completed:'Terminée', type:'Type', repeat:'Répétition',
    insertEquation:'Insérer équation', equationEditor:'Éditeur équation',
    equationError:'L\'équation contient des erreurs', editEquation:'Modifier équation',
    latexPreview:'Aperçu', boardInsertEquation:'Insérer équation', equationPlaceholder:'Écrivez LaTeX ici...',
      stats:'Statistiques', about:'À propos', totalNotes:'Total notes', totalBoards:'Total tableaux',
      totalStudySets:'Total ensembles', totalPostits:'Total post-its', totalReminders:'Total rappels',
      totalWords:'Total mots', versionLabel:'Version', licenses:'Licences', changelog:'Journal des modifications',
      developer:'Développeur', contact:'Contact', privacy:'Confidentialité', boardNoShadows:'Masquer ombres', reduceMotion:'Réduire animations',
      weekStartsMonday:'Semaine commence lundi', defaultBoardBg:'Fond tableau par défaut',
      boardBgLabel:'Fond du tableau', boardShadowsLabel:'Afficher ombres post-its',
      boardAnimationsLabel:'Afficher animations', showStats:'Statistiques', showAbout:'À propos',
      monday:'Lundi', sunday:'Dimanche',
      import:'Importer', importSuccess:'\u00c9l\u00e9ment import\u00e9 avec succ\u00e8s',
      invalidFile:'Fichier invalide ou corrompu',
      uuidConflict:'Un \u00e9l\u00e9ment avec cet ID existe d\u00e9j\u00e0. Un nouvel ID sera g\u00e9n\u00e9r\u00e9.',
      exportNote:'Exporter comme note', exportBoard:'Exporter comme tableau', exportStudySet:'Exporter comme jeu de cartes',
      habits:'Habitudes', habitsPending:'Habitudes', habitsCompleted:'Habitudes terminées', habitTask:'Habitude tâche', habitCounter:'Habitude compteur',
      habitName:'Nom', habitDesc:'Description', habitIcon:'Icône', habitColor:'Couleur', habitTotal:'Objectif', habitStep:'Pas',
      habitStreak:'Série', resetToday:'Réinitialiser aujourd\'hui', editHabit:'Modifier', deleteHabit:'Supprimer',
      confirmDeleteHabit:'Supprimer cette habitude ?', habitNameRequired:'Le nom est obligatoire.', habitTotalInvalid:'L\'objectif doit être supérieur à 0.', habitStepInvalid:'Le pas doit être supérieur à 0 et pas supérieur à l\'objectif.', habitStepIncoherent:'Le pas doit permettre d\'atteindre l\'objectif exactement (objectif divisible par pas).', createHabit:'Créer', habitEmpty:'Aucune habitude. Appuyez sur + pour en créer.', habitNeedsTotal:'Objectif et Pas requis pour compteur.', habitCreateTitle:'Nouvelle habitude', habitEditTitle:'Modifier habitude',
      registros:'Registres', registrosEmpty:'Pas encore de registres. Appuyez sur + pour en créer.', newRegistro:'Nouveau registre', editRegistro:'Modifier registre', deleteRegistro:'Supprimer registre', registroName:'Nom', addVariable:'Ajouter variable', noRegistros:'Pas de registres.', confirmDeleteRegistro:'Supprimer ce registre ?', confirmDeleteVariable:'Supprimer cette variable ?', registroNameRequired:'Le nom est obligatoire.', registroExists:'Un registre avec ce nom existe déjà.', variableExists:'Une variable avec ce nom existe déjà.', invalidRegistroName:'Nom invalide.', variableNameRequired:'Le nom de la variable est obligatoire.', invalidType:'Type invalide.', variableType:'Type', registroCreateTitle:'Nouveau registre', registroEditTitle:'Modifier registre', registroDeleteMsg:'Toutes les variables et l\'historique seront supprimés.', exportRegistro:'Exporter registre', importRegistro:'Importer registre', typeInt:'int', typeFloat:'float', typeBool:'bool', typeTexto:'texto', totalRegistros:'Total registres', fromDate:'Du', toDate:'Au', clearFilter:'Effacer', invalidDate:'Date invalide.', invalidRange:'Plage invalide.', valueMismatch:'Valeur incompatible.', registroNotFound:'Registre introuvable.', variableNotFound:'Variable introuvable.', trashTypeRegistro:'Registre', folder:'Dossier', folders:'Dossiers', newFolder:'Nouveau dossier', newFolderLabel:'Nouveau dossier', folderName:'Nom du dossier', folderNamePlaceholder:'Nom du dossier', protectedFolder:'Dossier protégé : ', deleteFolder:'Supprimer le dossier : ', deleteFolderMsg:'Les {n} notes contenues seront déplacées vers la vue principale.', deleteFolderEmpty:'Le dossier est vide.', emptyFolderHint:'Ce dossier est vide. Appuyez sur + pour créer une note.', subfoldersNotAllowed:'Les sous-dossiers ne sont pas autorisés.', moveToFolder:'Déplacer vers dossier', moveToNotes:'Déplacer vers Notes', changePassword:'Changer le mot de passe', invalidFolder:'Dossier invalide.', enterFolderId:'Entrez l\'ID du dossier :', countNote:'note', countNotes:'notes', renameFolder:'Renommer dossier', folderExists:'Le dossier existe déjà'
    },
  pt: {
    notes:'Notas', diary:'Diario', board:'Quadro', boards:'Quadros', studyCards:'Cartoes de estudo', settings:'Configuracoes', rename:'Renomear',
    newSet:'Novo conjunto', editSet:'Editar conjunto', deleteSet:'Excluir conjunto', addCard:'Adicionar cartao',
    front:'Frente', back:'Verso', know:'Sabia', dontKnow:'Nao sabia',
    noCards:'Nenhum cartao ainda', study:'Estudar', edit:'Editar', del:'Excluir',
    setName:'Nome do conjunto', enterSetName:'Digite o nome', cardList:'Cartoes', backToSets:'Voltar', showAnswer:'Clique para ver',
    darkTheme:'Tema escuro', lightTheme:'Tema claro',
    cancel:'Cancelar', create:'Criar', confirm:'Confirmar', close:'Fechar', understood:'Entendi',
    newNote:'Nova Nota', newBoard:'Novo Quadro', title:'Titulo', name:'Nome',
    passwordOptional:'Senha (opcional)', enterPassword:'Digite a senha',
    protectedNote:'Nota protegida: ', protectedBoard:'Quadro protegido: ',
    deleteNote:'Excluir nota: ', deleteBoard:'Excluir quadro: ',
    noteInFavorites:'Nota nos favoritos',
    unfavoriteToDelete:'Remova dos favoritos antes de excluir.',
    wrongPassword:'Senha incorreta',
    addFav:'Adicionar aos favoritos', removeFav:'Remover dos favoritos',
    exportPdf:'Exportar PDF', connect:'Conectar',
     addItem:'Adicionar item', addText:'Adicionar texto', insertImage:'Inserir imagem',
    addCover:'Adicionar capa', removeCover:'Remover capa', coverTooLarge:'Imagem muito grande. Max 5MB.',
    bold:'Negrito (Ctrl+B)', italic:'Italico (Ctrl+I)', underline:'Sublinhado (Ctrl+U)', highlight:'Destacar', bulletList:'Lista com marcadores', numberedList:'Lista numerada',
    bg:'Fundo', postit:'Post-it', cork:'Cortica', white:'Branco', black:'Preto', green:'Verde (quadro)', exportToPdf:'Exportar PDF', export:'Exportar', studyCards:'Cart\u00F5es de estudo', resetZoom:'Redefinir zoom',
    noteTitlePlaceholder:'Titulo da nota', boardNamePlaceholder:'Nome do quadro', leaveEmpty:'Deixe vazio se nao tiver senha',
    passwordProtected:'Protegido por senha', noContent:'Sem conteudo',
    noNotes:'Ainda nao ha notas.', noBoards:'Ainda nao ha quadros.', noDiaryEntries:'Nenhuma entrada no di\u00e1rio.',
    newNoteLabel:'Nova nota', newBoardLabel:'Novo quadro',
    addItemsPrompt:'Adicione itens a sua nota',
    textPlaceholder:'Escreva seu texto aqui...', itemPlaceholder:'Escreva aqui...',
    back:'Voltar', selectNote:'Selecione ou crie uma nota',
    selectBoard:'Selecione ou crie um quadro',
    exported:'Exportado: ', printError:'Erro ao imprimir', processingExport:'Sua nota est\u00e1 sendo processada',
    needPostits:'Pelo menos 2 post-its necessarios',
    clickDestiny:'Clique no post-it de destino',
    connectionCreated:'Conexao criada', connectionExists:'Essa conexao ja existe',
    chooseOther:'Escolha outro post-it',
    diarySection:'Diario', language:'Idioma',
    cafecitoDesc:'A Biblioteca de Babel e infinita. Os recursos para desenvolve-la nao. Se o MiBabel e util para voce, pode ajudar a continuar construindo.',
    libro:'Um livro', estante:'Uma estante', galeria:'Uma galeria', salaBabel:'Uma sala de Babel',
    trash:'Lixeira', trashEmpty:'A lixeira est\u00e1 vazia.', trashSubtitle:'Os itens exclu\u00eddos s\u00e3o removidos automaticamente ap\u00f3s 30 dias.',
    restore:'Restaurar', deletePermanent:'Excluir', confirmDeletePermanent:'Excluir permanentemente?',
    trashDaysLeft:'Exclu\u00eddo em ', trashDaysUnit:' dia(s)', trashDeletedSoon:'Ser\u00e1 exclu\u00eddo em breve',
    trashTypeNote:'Nota', trashTypeBoard:'Quadro', trashTypeStudySet:'Cart\u00f5es de estudo',
    linkHelpTitle:'Links entre notas e URLs', linkToNote:'Vincula a outra nota', linkToUrl:'Vincula a uma URL externa',
    diaryPwdLabel:'Senha do di\u00e1rio', diaryPwdSet:'\uD83D\uDD12 Senha definida', diaryPwdChange:'Alterar', diaryPwdRemove:'Remover', diaryPwdNone:'Sem senha', diaryPwdSetBtn:'Definir',
    diaryPwdSetTitle:'Definir senha do di\u00e1rio', diaryPwdChangeTitle:'Alterar senha do di\u00e1rio', diaryPwdRemoveTitle:'Remover senha do di\u00e1rio',
    diaryPwdOldLabel:'Senha atual', diaryPwdNewLabel:'Nova senha',
    diaryPwdAlertEmpty:'Digite uma senha.', diaryPwdAlertWrong:'Senha atual incorreta.', diaryPwdAlertNewEmpty:'Digite a nova senha.',
    diaryProtected:'Notas do di\u00e1rio protegidas', diaryForgotPwd:'Esqueceu a senha?',
    recoveryPrompt:'Digite seu c\u00f3digo de recupera\u00e7\u00e3o:', recoveryWrong:'C\u00f3digo incorreto.',
    recoveryDialogTitle:'C\u00f3digo de recupera\u00e7\u00e3o', recoveryDialogMsg:'Guarde este c\u00f3digo em um lugar seguro. Se voc\u00ea esquecer sua senha, poder\u00e1 us\u00e1-lo para recuperar o acesso \u00e0s suas notas do di\u00e1rio.', recoveryDialogBtn:'J\u00e1 salvei',
    migrateLabel:'Migrar dados', exportBtn:'Exportar dados', importBtn:'Importar dados',
    save:'Salvar', preview:'Visualizar:', insert:'Inserir', newSetTitle:'Novo conjunto',
    insertTable:'Tabela', mergeCells:'Mesclar', splitCell:'Dividir', alignLeft:'Esquerda', alignCenter:'Centro', alignRight:'Direita', alignJustify:'Justificar', tableRows:'Linhas', tableCols:'Colunas', createTable:'Criar',
    months:['Janeiro','Fevereiro','Marco','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
    dayAbbr:['Do','Se','Te','Qu','Qu','Se','Sa'],
    searchDate:'Buscar data (dd/mm/aaaa)',
    checkDownloads:'Verifique a pasta de Downloads',
    welcomeTitle:'Bem-vindo ao MiBabel',
    welcomeMsg:'Dou-lhe as boas-vindas ao MiBabel, um projeto independente criado por mim, um estudante apaixonado pelo conhecimento.<br><br>O MiBabel nasceu principalmente pensando nos estudantes. Gra\u00e7as \u00e0 sua simplicidade e suas diversas ferramentas, busca tornar-se um companheiro de estudo e organiza\u00e7\u00e3o. No entanto, est\u00e1 aberto a qualquer pessoa que deseje organizar suas ideias, projetos e aprendizados.<br><br>Seu nome \u00e9 inspirado em \u00abA Biblioteca de Babel\u00bb, o famoso conto do escritor e poeta argentino Jorge Luis Borges, que imagina uma biblioteca infinita capaz de conter todos os livros poss\u00edveis.<br><br><i>\u00abA Biblioteca \u00e9 uma esfera cujo centro exato \u00e9 qualquer hex\u00e1gono, cuja circunfer\u00eancia \u00e9 inacess\u00edvel.\u00bb</i><br><br>Fragmento de \u00abA Biblioteca de Babel\u00bb, de Jorge Luis Borges.<br><br>O MiBabel \u00e9 um aplicativo gratuito, privado e projetado para ser \u00fatil. Se voc\u00ea o achar valioso, pode contribuir para seu desenvolvimento e ajudar esta biblioteca a continuar crescendo.',
    milestoneMsg:'Se o MiBabel est\u00e1 sendo \u00fatil para voc\u00ea, convido-o a contribuir para que esta biblioteca continue crescendo.',
    milestoneBtn:'Agora n\u00e3o',
    insertEquation:'Inserir equa\u00e7\u00e3o', equationEditor:'Editor de equa\u00e7\u00e3o',
    equationError:'A equa\u00e7\u00e3o cont\u00e9m erros', editEquation:'Editar equa\u00e7\u00e3o',
    latexPreview:'Visualiza\u00e7\u00e3o', boardInsertEquation:'Inserir equa\u00e7\u00e3o', equationPlaceholder:'Escreva LaTeX aqui...',
      stats:'Estat\u00edsticas', about:'Sobre', totalNotes:'Total de notas', totalBoards:'Total de quadros',
      totalStudySets:'Total de conjuntos', postits:'Post-its', totalReminders:'Total de lembretes',
      event:'Evento', task:'Tarefa', remindMe:'Lembrar-me', everyWeek:'Toda semana', everyMonth:'Todo mês', everyYear:'Todo ano', everyDay:'Todos os dias', noRepeat:'Sem repetição', type:'Tipo', repeat:'Repetição', time:'Hora', testNotif:'Testar notificação', testNotifSent:'Notificação agendada para 15 segundos', testNotifDenied:'As notificações estão desativadas. Ative-as nas configurações do sistema.', testNotifUnsupported:'As notificações não estão disponíveis aqui.', testNotifBody:'Notificação de teste',
      totalWords:'Total de palavras', versionLabel:'Vers\u00e3o', licenses:'Licen\u00e7as', changelog:'Registro de altera\u00e7\u00f5es',
      developer:'Desenvolvedor', contact:'Contato', privacy:'Privacidade', boardNoShadows:'Ocultar sombras', reduceMotion:'Reduzir movimento',
      weekStartsMonday:'Semana come\u00e7a na segunda', defaultBoardBg:'Fundo padr\u00e3o do quadro',
      boardBgLabel:'Fundo do quadro', boardShadowsLabel:'Mostrar sombras em post-its',
      boardAnimationsLabel:'Mostrar anima\u00e7\u00f5es', showStats:'Estat\u00edsticas', showAbout:'Sobre',
      monday:'Segunda-feira', sunday:'Domingo',
      import:'Importar', importSuccess:'Elemento importado com sucesso',
      invalidFile:'Arquivo inv\u00e1lido ou corrompido',
      uuidConflict:'J\u00e1 existe um elemento com este ID. Um novo ID ser\u00e1 gerado.',
      exportNote:'Exportar como nota', exportBoard:'Exportar como quadro', exportStudySet:'Exportar como conjunto',
      habits:'Hábitos', habitsPending:'Hábitos', habitsCompleted:'Hábitos concluídos', habitTask:'Hábito tarefa', habitCounter:'Hábito contador',
      habitName:'Nome', habitDesc:'Descrição', habitIcon:'Ícone', habitColor:'Cor', habitTotal:'Meta', habitStep:'Passo',
      habitStreak:'Sequência', resetToday:'Reiniciar hoje', editHabit:'Editar', deleteHabit:'Excluir',
      confirmDeleteHabit:'Excluir este hábito?', habitNameRequired:'O nome é obrigatório.', habitTotalInvalid:'A meta deve ser maior que 0.', habitStepInvalid:'O passo deve ser maior que 0 e não maior que a meta.', habitStepIncoherent:'O passo deve permitir atingir a meta exatamente (meta divisível por passo).', createHabit:'Criar', habitEmpty:'Nenhum hábito ainda. Toque em + para criar.', habitNeedsTotal:'Meta e Passo obrigatórios para contador.', habitCreateTitle:'Novo hábito', habitEditTitle:'Editar hábito',

      registros:'Registros', registrosEmpty:'Ainda não há registros. Toque em + para criar.', newRegistro:'Novo registro', editRegistro:'Editar registro', deleteRegistro:'Excluir registro', registroName:'Nome', addVariable:'Adicionar variável', noRegistros:'Nenhum registro.', confirmDeleteRegistro:'Excluir este registro?', confirmDeleteVariable:'Excluir esta variável?', registroNameRequired:'O nome é obrigatório.', registroExists:'Já existe um registro com esse nome.', variableExists:'Já existe uma variável com esse nome.', invalidRegistroName:'Nome inválido.', variableNameRequired:'O nome da variável é obrigatório.', invalidType:'Tipo inválido.', variableType:'Tipo', registroCreateTitle:'Novo registro', registroEditTitle:'Editar registro', registroDeleteMsg:'Todas as variáveis e histórico serão excluídos.', exportRegistro:'Exportar registro', importRegistro:'Importar registro', typeInt:'int', typeFloat:'float', typeBool:'bool', typeTexto:'texto', totalRegistros:'Total registros', fromDate:'De', toDate:'Até', clearFilter:'Limpar', invalidDate:'Data inválida.', invalidRange:'Intervalo inválido.', valueMismatch:'Valor incompatível.', registroNotFound:'Registro não encontrado.', variableNotFound:'Variável não encontrada.', trashTypeRegistro:'Registro', folder:'Pasta', folders:'Pastas', newFolder:'Nova pasta', newFolderLabel:'Nova pasta', folderName:'Nome da pasta', folderNamePlaceholder:'Nome da pasta', protectedFolder:'Pasta protegida: ', deleteFolder:'Excluir pasta: ', deleteFolderMsg:'As {n} notas dentro serão movidas para a visão principal.', deleteFolderEmpty:'A pasta está vazia.', emptyFolderHint:'Esta pasta está vazia. Toque em + para criar uma nota.', subfoldersNotAllowed:'Subpastas não são permitidas.', moveToFolder:'Mover para pasta', moveToNotes:'Mover para Notas', changePassword:'Alterar senha', invalidFolder:'Pasta inválida.', enterFolderId:'Digite o ID da pasta:', countNote:'nota', countNotes:'notas', renameFolder:'Renomear pasta', folderExists:'A pasta já existe'    },
  ru: {
    notes:'Заметки', diary:'Дневник', board:'Доска', boards:'Доски', studyCards:'Учебные карточки', settings:'Настройки', rename:'Переименовать',
    newSet:'Новый набор', editSet:'Редактировать', deleteSet:'Удалить', addCard:'Добавить карточку',
    front:'Лицевая', back:'Обратная', know:'Знаю', dontKnow:'Не знаю',
    noCards:'Нет карточек', study:'Учить', edit:'Правка', del:'Удалить',
    setName:'Название', enterSetName:'Введите название', cardList:'Карточки', backToSets:'Назад', showAnswer:'Нажмите чтобы открыть',
    darkTheme:'Темная тема', lightTheme:'Светлая тема',
    cancel:'Отмена', create:'Создать', confirm:'Подтвердить', close:'Закрыть', understood:'Понятно',
    newNote:'Новая заметка', newBoard:'Новая доска', title:'Заголовок', name:'Имя',
    passwordOptional:'Пароль (необязательно)', enterPassword:'Введите пароль',
    protectedNote:'Защищенная заметка: ', protectedBoard:'Защищенная доска: ',
    deleteNote:'Удалить заметку: ', deleteBoard:'Удалить доску: ',
    noteInFavorites:'Заметка в избранном',
    unfavoriteToDelete:'Удалите из избранного перед удалением.',
    wrongPassword:'Неверный пароль',
    addFav:'Добавить в избранное', removeFav:'Убрать из избранного',
    exportPdf:'Экспорт PDF', connect:'Соединить',
     addItem:'Добавить пункт', addText:'Добавить текст', insertImage:'Вставить изображение', voiceNote:'Голосовая заметка',
    addCover:'Добавить обложку', removeCover:'Удалить обложку', coverTooLarge:'Изображение слишком большое. Макс 5МБ.',
    bold:'Жирный (Ctrl+B)', italic:'Курсив (Ctrl+I)', underline:'Подчеркнутый (Ctrl+U)', highlight:'Выделить', bulletList:'Маркированный список', numberedList:'Нумерованный список',
    bg:'Фон', postit:'Стикер', cork:'Пробка', white:'Белый', black:'Черный', green:'Зеленый (доска)', exportToPdf:'Экспорт PDF', export:'Экспорт', studyCards:'Карточки для изучения',
    noteTitlePlaceholder:'Заголовок заметки', boardNamePlaceholder:'Имя доски', leaveEmpty:'Оставьте пустым если нет пароля',
    passwordProtected:'Защищено паролем', noContent:'Нет содержимого',
    noNotes:'Еще нет заметок.', noBoards:'Еще нет досок.', noDiaryEntries:'Нет записей в дневнике.',
    newNoteLabel:'Новая заметка', newBoardLabel:'Новая доска',
    addItemsPrompt:'Добавьте пункты в заметку',
    textPlaceholder:'Напишите текст здесь...', itemPlaceholder:'Напишите здесь...',
    back:'Назад', selectNote:'Выберите или создайте заметку',
    selectBoard:'Выберите или создайте доску',
    exported:'\u042d\u043a\u0441\u043f\u043e\u0440\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u043e: ', printError:'\u041e\u0448\u0438\u0431\u043a\u0430 \u043f\u0435\u0447\u0430\u0442\u0438', processingExport:'\u0412\u0430\u0448\u0430 \u0437\u0430\u043c\u0435\u0442\u043a\u0430 \u043e\u0431\u0440\u0430\u0431\u0430\u0442\u044b\u0432\u0430\u0435\u0442\u0441\u044f',
    needPostits:'Нужно как минимум 2 стикера',
    clickDestiny:'Нажмите на целевой стикер',
    connectionCreated:'Соединение создано', connectionExists:'Такое соединение уже существует',
    chooseOther:'Выберите другой стикер',
    diarySection:'Дневник', language:'Язык',
    cafecitoDesc:'Вавилонская библиотека бесконечна. Ресурсы для ее развития - нет. Если MiBabel вам полезен, вы можете помочь продолжать ее строить.',
    libro:'Книга', estante:'Стеллаж', galeria:'Галерея', salaBabel:'Зал Вавилона',
    trash:'Корзина', trashEmpty:'Корзина пуста.', trashSubtitle:'Удаленные элементы автоматически удаляются через 30 дней.',
    restore:'Восстановить', deletePermanent:'Удалить', confirmDeletePermanent:'Удалить навсегда?',
    trashDaysLeft:'Удалится через ', trashDaysUnit:' дн.', trashDeletedSoon:'Скоро удалится',
    trashTypeNote:'Заметка', trashTypeBoard:'Доска', trashTypeStudySet:'Карточки',
    linkHelpTitle:'Ссылки между заметками и URL', linkToNote:'Ссылка на другую заметку', linkToUrl:'Ссылка на внешний URL',
    diaryPwdLabel:'Пароль дневника', diaryPwdSet:'\uD83D\uDD12 Пароль установлен', diaryPwdChange:'Изменить', diaryPwdRemove:'Удалить', diaryPwdNone:'Нет пароля', diaryPwdSetBtn:'Установить',
    diaryPwdSetTitle:'Установить пароль дневника', diaryPwdChangeTitle:'Изменить пароль дневника', diaryPwdRemoveTitle:'Удалить пароль дневника',
    diaryPwdOldLabel:'Текущий пароль', diaryPwdNewLabel:'Новый пароль',
    diaryPwdAlertEmpty:'Введите пароль.', diaryPwdAlertWrong:'Неверный текущий пароль.', diaryPwdAlertNewEmpty:'Введите новый пароль.',
    diaryProtected:'Заметки дневника защищены', diaryForgotPwd:'Забыли пароль?',
    recoveryPrompt:'Введите код восстановления:', recoveryWrong:'Неверный код.',
    recoveryDialogTitle:'Код восстановления', recoveryDialogMsg:'Сохраните этот код в надежном месте. Если вы забудете пароль, вы сможете использовать его для восстановления доступа к заметкам дневника.', recoveryDialogBtn:'Я сохранил',
    migrateLabel:'Миграция данных', exportBtn:'Экспорт данных', importBtn:'Импорт данных',
    save:'Сохранить', preview:'Предпросмотр:', insert:'Вставить', newSetTitle:'Новый набор',
    insertTable:'Таблица', mergeCells:'Объединить', splitCell:'Разделить', alignLeft:'Слева', alignCenter:'По центру', alignRight:'Справа', alignJustify:'По ширине', tableRows:'Строки', tableCols:'Столбцы', createTable:'Создать',
    months:['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
    dayAbbr:['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
    searchDate:'Поиск даты (дд/мм/гггг)',
    checkDownloads:'Проверьте папку Загрузки',
    welcomeTitle:'Добро пожаловать в MiBabel',
    welcomeMsg:'Я приветствую вас в MiBabel, независимом проекте, созданном мной, студентом, увлеченным знаниями.<br><br>MiBabel был создан в первую очередь для студентов. Благодаря своей простоте и разнообразным инструментам, он стремится стать спутником в учебе и организации. Однако он открыт для любого, кто хочет упорядочить свои идеи, проекты и знания.<br><br>Его название вдохновлено \u00ab\u0412\u0430\u0432\u0438\u043b\u043e\u043d\u0441\u043a\u043e\u0439 \u0431\u0438\u0431\u043b\u0438\u043e\u0442\u0435\u043a\u043e\u0439\u00bb, знаменитым рассказом аргентинского писателя и поэта Хорхе Луиса Борхеса, который представляет бесконечную библиотеку, способную вместить все возможные книги.<br><br><i>\u00ab\u0411\u0438\u0431\u043b\u0438\u043e\u0442\u0435\u043a\u0430 \u2014 \u044d\u0442\u043e \u0441\u0444\u0435\u0440\u0430, \u0442\u043e\u0447\u043d\u044b\u0439 \u0446\u0435\u043d\u0442\u0440 \u043a\u043e\u0442\u043e\u0440\u043e\u0439 \u2014 \u043b\u044e\u0431\u043e\u0439 \u0448\u0435\u0441\u0442\u0438\u0443\u0433\u043e\u043b\u044c\u043d\u0438\u043a, \u0430 \u043e\u043a\u0440\u0443\u0436\u043d\u043e\u0441\u0442\u044c \u043d\u0435\u0434\u043e\u0441\u0442\u0443\u043f\u043d\u0430.\u00bb</i><br><br>\u041e\u0442\u0440\u044b\u0432\u043e\u043a \u0438\u0437 \u00ab\u0412\u0430\u0432\u0438\u043b\u043e\u043d\u0441\u043a\u043e\u0439 \u0431\u0438\u0431\u043b\u0438\u043e\u0442\u0435\u043a\u0438\u00bb, \u0425\u043e\u0440\u0445\u0435 \u041b\u0443\u0438\u0441 \u0411\u043e\u0440\u0445\u0435\u0441.<br><br>MiBabel \u2014 \u044d\u0442\u043e \u0431\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u043e\u0435, \u043f\u0440\u0438\u0432\u0430\u0442\u043d\u043e\u0435 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0435, \u0441\u043e\u0437\u0434\u0430\u043d\u043d\u043e\u0435 \u0447\u0442\u043e\u0431\u044b \u0431\u044b\u0442\u044c \u043f\u043e\u043b\u0435\u0437\u043d\u044b\u043c. \u0415\u0441\u043b\u0438 \u0432\u044b \u043d\u0430\u0445\u043e\u0434\u0438\u0442\u0435 \u0435\u0433\u043e \u0446\u0435\u043d\u043d\u044b\u043c, \u0432\u044b \u043c\u043e\u0436\u0435\u0442\u0435 \u043f\u043e\u043c\u043e\u0447\u044c \u0435\u0433\u043e \u0440\u0430\u0437\u0432\u0438\u0442\u0438\u044e \u0438 \u043f\u043e\u043c\u043e\u0447\u044c \u044d\u0442\u043e\u0439 \u0431\u0438\u0431\u043b\u0438\u043e\u0442\u0435\u043a\u0435 \u043f\u0440\u043e\u0434\u043e\u043b\u0436\u0430\u0442\u044c \u0440\u0430\u0441\u0442\u0438.',
    milestoneMsg:'\u0415\u0441\u043b\u0438 MiBabel \u0432\u0430\u043c \u043f\u043e\u043b\u0435\u0437\u0435\u043d, \u044f \u043f\u0440\u0438\u0433\u043b\u0430\u0448\u0430\u044e \u0432\u0430\u0441 \u0432\u043d\u0435\u0441\u0442\u0438 \u0432\u043a\u043b\u0430\u0434, \u0447\u0442\u043e\u0431\u044b \u044d\u0442\u0430 \u0431\u0438\u0431\u043b\u0438\u043e\u0442\u0435\u043a\u0430 \u043f\u0440\u043e\u0434\u043e\u043b\u0436\u0430\u043b\u0430 \u0440\u0430\u0441\u0442\u0438.',
    milestoneBtn:'\u041d\u0435 \u0441\u0435\u0439\u0447\u0430\u0441',
     event:'Событие', task:'Задача', remindMe:'Напомнить',
    everyWeek:'Каждую неделю', everyMonth:'Каждый месяц', everyYear:'Каждый год', everyDay:'Каждый день', time:'Время', testNotif:'Проверить уведомление', testNotifSent:'Уведомление запланировано через 15 секунд', testNotifDenied:'Уведомления отключены. Включите их в системных настройках.', testNotifUnsupported:'Уведомления здесь недоступны.', testNotifBody:'Тестовое уведомление',
    noRepeat:'Без повторения', pending:'Ожидает', completed:'Завершено', type:'Тип', repeat:'Повторение',
    insertEquation:'Вставить уравнение', equationEditor:'Редактор уравнений',
    equationError:'Уравнение содержит ошибки', editEquation:'Редактировать уравнение',
    latexPreview:'Предпросмотр', boardInsertEquation:'Вставить уравнение', equationPlaceholder:'Напишите LaTeX здесь...',
      stats:'Статистика', about:'О приложении', totalNotes:'Всего заметок', totalBoards:'Всего досок',
      totalStudySets:'Всего наборов', totalPostits:'Всего стикеров', totalReminders:'Всего напоминаний',
      totalWords:'Всего слов', versionLabel:'Версия', licenses:'Лицензии', changelog:'История изменений',
      developer:'Разработчик', contact:'Контакт', privacy:'Конфиденциальность', boardNoShadows:'Скрыть тени', reduceMotion:'Уменьшить анимацию',
      weekStartsMonday:'Неделя начинается с понедельника', defaultBoardBg:'Фон доски по умолчанию',
      boardBgLabel:'Фон доски', boardShadowsLabel:'Показывать тени стикеров',
      boardAnimationsLabel:'Показывать анимацию', showStats:'Статистика', showAbout:'О приложении',
      monday:'Понедельник', sunday:'Воскресенье',
      import:'Импорт', importSuccess:'Элемент успешно импортирован',
      invalidFile:'Неверный или поврежденный файл',
      uuidConflict:'Элемент с таким ID уже существует. Будет сгенерирован новый ID.',
      exportNote:'Экспорт как заметку', exportBoard:'Экспорт как доску', exportStudySet:'Экспорт как набор карточек',
      habits:'Привычки', habitsPending:'Привычки', habitsCompleted:'Выполненные привычки', habitTask:'Привычка-задача', habitCounter:'Привычка-счётчик',
      habitName:'Название', habitDesc:'Описание', habitIcon:'Иконка', habitColor:'Цвет', habitTotal:'Цель', habitStep:'Шаг',
      habitStreak:'Серия', resetToday:'Сбросить сегодня', editHabit:'Редактировать', deleteHabit:'Удалить',
      confirmDeleteHabit:'Удалить эту привычку?', habitNameRequired:'Название обязательно.', habitTotalInvalid:'Цель должна быть больше 0.', habitStepInvalid:'Шаг должен быть больше 0 и не больше цели.', habitStepIncoherent:'Шаг должен позволять точно достичь цели (цель делится на шаг).', createHabit:'Создать', habitEmpty:'Пока нет привычек. Нажмите +.', habitNeedsTotal:'Цель и Шаг обязательны для счётчика.', habitCreateTitle:'Новая привычка', habitEditTitle:'Редактировать привычку',

      registros:'Записи', registrosEmpty:'Пока нет записей.', newRegistro:'Новая запись', editRegistro:'Редактировать запись', deleteRegistro:'Удалить запись', registroName:'Имя', addVariable:'Добавить переменную', noRegistros:'Нет записей.', confirmDeleteRegistro:'Удалить эту запись?', confirmDeleteVariable:'Удалить эту переменную?', registroNameRequired:'Имя обязательно.', registroExists:'Запись с таким именем уже существует.', variableExists:'Переменная с таким именем уже существует.', invalidRegistroName:'Неверное имя.', variableNameRequired:'Имя переменной обязательно.', invalidType:'Неверный тип.', variableType:'Тип', registroCreateTitle:'Новая запись', registroEditTitle:'Редактировать запись', registroDeleteMsg:'Все переменные и история будут удалены.', exportRegistro:'Экспорт записи', importRegistro:'Импорт записи', typeInt:'int', typeFloat:'float', typeBool:'bool', typeTexto:'texto', totalRegistros:'Всего записей', fromDate:'С', toDate:'По', clearFilter:'Очистить', invalidDate:'Неверная дата.', invalidRange:'Неверный диапазон.', valueMismatch:'Значение не соответствует типу.', registroNotFound:'Запись не найдена.', variableNotFound:'Переменная не найдена.', trashTypeRegistro:'Запись', folder:'Папка', folders:'Папки', newFolder:'Новая папка', newFolderLabel:'Новая папка', folderName:'Имя папки', folderNamePlaceholder:'Имя папки', protectedFolder:'Защищенная папка: ', deleteFolder:'Удалить папку: ', deleteFolderMsg:'{n} заметок будут перемещены в основной вид.', deleteFolderEmpty:'Папка пуста.', emptyFolderHint:'Эта папка пуста. Нажмите +, чтобы создать заметку.', subfoldersNotAllowed:'Подпапки не разрешены.', moveToFolder:'Переместить в папку', moveToNotes:'Переместить в Заметки', changePassword:'Сменить пароль', invalidFolder:'Неверная папка.', enterFolderId:'Введите ID папки:', countNote:'заметка', countNotes:'заметок', renameFolder:'Переименовать папку', folderExists:'Папка уже существует'    },
  de: {
    notes:'Notizen', diary:'Tagebuch', board:'Pinnwand', boards:'Pinnw\u00e4nde', studyCards:'Lernkarten', settings:'Einstellungen', rename:'Umbenennen',
    newSet:'Neues Set', editSet:'Set bearbeiten', deleteSet:'Set l\u00f6schen', addCard:'Karte hinzuf\u00fcgen',
    front:'Vorderseite', back:'R\u00fcckseite', know:'Gewusst', dontKnow:'Nicht gewusst',
    noCards:'Noch keine Karten', study:'Lernen', edit:'Bearbeiten', del:'L\u00f6schen',
    setName:'Name des Sets', enterSetName:'Name des Sets eingeben', cardList:'Karten', backToSets:'Zur\u00fcck zu Sets', showAnswer:'Klicken zum Anzeigen',
    darkTheme:'Dunkles Design', lightTheme:'Helles Design',
    cancel:'Abbrechen', create:'Erstellen', confirm:'Best\u00e4tigen', close:'Schlie\u00dfen', understood:'Verstanden',
    newNote:'Neue Notiz', newBoard:'Neue Pinnwand', title:'Titel', name:'Name',
    passwordOptional:'Passwort (optional)', enterPassword:'Passwort eingeben',
    protectedNote:'Gesch\u00fctzte Notiz: ', protectedBoard:'Gesch\u00fctzte Pinnwand: ',
    deleteNote:'Notiz l\u00f6schen: ', deleteBoard:'Pinnwand l\u00f6schen: ',
    noteInFavorites:'Notiz in Favoriten',
    unfavoriteToDelete:'Vor dem L\u00f6schen aus Favoriten entfernen.',
    wrongPassword:'Falsches Passwort',
    addFav:'Zu Favoriten hinzuf\u00fcgen', removeFav:'Aus Favoriten entfernen',
    exportPdf:'Als PDF exportieren', connect:'Verbinden',
     addItem:'Element hinzuf\u00fcgen', addText:'Text hinzuf\u00fcgen', insertImage:'Bild einf\u00fcgen', voiceNote:'Sprachnotiz',
    addCover:'Cover hinzuf\u00fcgen', removeCover:'Cover entfernen', coverTooLarge:'Bild zu gro\u00df. Max. 5 MB.',
    bold:'Fett (Ctrl+B)', italic:'Kursiv (Ctrl+I)', underline:'Unterstrichen (Ctrl+U)', highlight:'Hervorheben', bulletList:'Aufz\u00e4hlungsliste', numberedList:'Nummerierte Liste',
    bg:'Hintergrund', postit:'Haftnotiz', cork:'Kork', white:'Wei\u00df', black:'Schwarz', green:'Gr\u00fcn (Pinnwand)', exportToPdf:'Als PDF exportieren', export:'Exportieren', studyCards:'Lernkarten',
    noteTitlePlaceholder:'Titel der Notiz', boardNamePlaceholder:'Name der Pinnwand', leaveEmpty:'Bei keinem Passwort leer lassen',
    passwordProtected:'Passwortgesch\u00fctzt', noContent:'Kein Inhalt',
    noNotes:'Noch keine Notizen.', noBoards:'Noch keine Pinnw\u00e4nde.', noDiaryEntries:'Keine Tagebucheintr\u00e4ge.',
    newNoteLabel:'Neue Notiz', newBoardLabel:'Neue Pinnwand',
    addItemsPrompt:'F\u00fcge deiner Notiz Elemente hinzu',
    textPlaceholder:'Schreibe deinen Text hier...', itemPlaceholder:'Schreibe hier...',
    back:'Zur\u00fcck', selectNote:'W\u00e4hle oder erstelle eine Notiz', selectBoard:'W\u00e4hle oder erstelle eine Pinnwand',
    exported:'Exportiert: ', printError:'Fehler beim Drucken', processingExport:'Ihre Notiz wird verarbeitet',
    needPostits:'Mindestens 2 Haftnotizen erforderlich',
    clickDestiny:'Klicke auf die Ziel-Haftnotiz',
    connectionCreated:'Verbindung erstellt', connectionExists:'Verbindung existiert bereits',
    chooseOther:'W\u00e4hle eine andere Haftnotiz',
    diarySection:'Tagebuch', language:'Sprache',
    cafecitoDesc:'Die Bibliothek von Babel ist unendlich. Die Ressourcen, sie zu entwickeln, sind es nicht. Wenn MiBabel f\u00fcr dich n\u00fctzlich ist, kannst du helfen, sie weiter aufzubauen.',
    libro:'Ein Buch', estante:'Ein Regal', galeria:'Eine Galerie', salaBabel:'Ein Babel-Saal',
    trash:'Papierkorb', trashEmpty:'Der Papierkorb ist leer.', trashSubtitle:'Gel\u00f6schte Elemente werden nach 30 Tagen automatisch entfernt.',
    restore:'Wiederherstellen', deletePermanent:'Endg\u00fcltig l\u00f6schen', confirmDeletePermanent:'Endg\u00fcltig l\u00f6schen?',
    trashDaysLeft:'Gel\u00f6scht in ', trashDaysUnit:' Tag(en)', trashDeletedSoon:'Wird bald gel\u00f6scht',
    trashTypeNote:'Notiz', trashTypeBoard:'Pinnwand', trashTypeStudySet:'Lernkarten',
    linkHelpTitle:'Links zwischen Notizen & URLs', linkToNote:'Verlinkt zu einer anderen Notiz', linkToUrl:'Verlinkt zu einer externen URL',
    diaryPwdLabel:'Tagebuch-Passwort', diaryPwdSet:'\uD83D\uDD12 Passwort festgelegt', diaryPwdChange:'\u00c4ndern', diaryPwdRemove:'Entfernen', diaryPwdNone:'Kein Passwort', diaryPwdSetBtn:'Festlegen',
    diaryPwdSetTitle:'Tagebuch-Passwort festlegen', diaryPwdChangeTitle:'Tagebuch-Passwort \u00e4ndern', diaryPwdRemoveTitle:'Tagebuch-Passwort entfernen',
    diaryPwdOldLabel:'Aktuelles Passwort', diaryPwdNewLabel:'Neues Passwort',
    diaryPwdAlertEmpty:'Gib ein Passwort ein.', diaryPwdAlertWrong:'Aktuelles Passwort ist falsch.', diaryPwdAlertNewEmpty:'Gib das neue Passwort ein.',
    diaryProtected:'Tagebuch-Notizen sind gesch\u00fctzt', diaryForgotPwd:'Passwort vergessen?',
    recoveryPrompt:'Gib deinen Wiederherstellungscode ein:', recoveryWrong:'Falscher Code.',
    recoveryDialogTitle:'Wiederherstellungscode', recoveryDialogMsg:'Bewahre diesen Code an einem sicheren Ort auf. Wenn du dein Passwort vergisst, kannst du ihn verwenden, um den Zugriff auf deine Tagebuch-Notizen wiederherzustellen.', recoveryDialogBtn:'Ich habe ihn gespeichert',
    migrateLabel:'Daten migrieren', exportBtn:'Daten exportieren', importBtn:'Daten importieren',
    save:'Speichern', preview:'Vorschau:', insert:'Einf\u00fcgen', newSetTitle:'Neues Set',
    insertTable:'Tabelle', mergeCells:'Zusammenf\u00fchren', splitCell:'Teilen', alignLeft:'Links', alignCenter:'Zentriert', alignRight:'Rechts', alignJustify:'Blocksatz', tableRows:'Zeilen', tableCols:'Spalten', createTable:'Erstellen',
    months:['Januar','Februar','M\u00e4rz','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
    dayAbbr:['So','Mo','Di','Mi','Do','Fr','Sa'],
    searchDate:'Datum suchen (tt/mm/jjjj)',
    checkDownloads:'Prüfen Sie den Download-Ordner',
    welcomeTitle:'Willkommen bei MiBabel',
    welcomeMsg:'Willkommen bei MiBabel, einem unabh\u00e4ngigen Projekt, das von mir, einem leidenschaftlichen Studenten, erstellt wurde.<br><br>MiBabel wurde haupts\u00e4chlich f\u00fcr Studenten entwickelt. Dank seiner Einfachheit und seiner vielf\u00e4ltigen Werkzeuge m\u00f6chte es zu einem Begleiter f\u00fcr Studium und Organisation werden. Es steht jedoch jedem offen, der seine Ideen, Projekte und Lerninhalte ordnen m\u00f6chte.<br><br>Sein Name ist inspiriert von \u00abDie Bibliothek von Babel\u00bb, der ber\u00fchmten Erz\u00e4hlung des argentinischen Schriftstellers und Dichters Jorge Luis Borges, die eine unendliche Bibliothek vorstellt, die alle m\u00f6glichen B\u00fccher enthalten kann.<br><br><i>\u00abDie Bibliothek ist eine Kugel, deren genaues Zentrum ein beliebiges Sechseck ist, deren Umfang unzug\u00e4nglich ist.\u00bb</i><br><br>Auszug aus \u00abDie Bibliothek von Babel\u00bb von Jorge Luis Borges.<br><br>MiBabel ist eine kostenlose, private Anwendung, die n\u00fctzlich sein soll. Wenn du sie wertvoll findest, kannst du zu ihrer Entwicklung beitragen und helfen, dass diese Bibliothek weiter w\u00e4chst.',
    milestoneMsg:'Wenn dir MiBabel n\u00fctzt, lade ich dich ein, einen Beitrag zu leisten, damit diese Bibliothek weiter wachsen kann.',
    milestoneBtn:'Nicht jetzt',
     event:'Ereignis', task:'Aufgabe', remindMe:'Erinnern',
    everyWeek:'Jede Woche', everyMonth:'Jeden Monat', everyYear:'Jedes Jahr', everyDay:'Jeden Tag', time:'Zeit', testNotif:'Benachrichtigung testen', testNotifSent:'Benachrichtigung in 15 Sekunden geplant', testNotifDenied:'Benachrichtigungen sind deaktiviert. Aktiviere sie in den Systemeinstellungen.', testNotifUnsupported:'Benachrichtigungen sind hier nicht verfügbar.', testNotifBody:'Testbenachrichtigung',
    noRepeat:'Keine Wiederholung', pending:'Ausstehend', completed:'Abgeschlossen', type:'Typ', repeat:'Wiederholung',
    insertEquation:'Gleichung einf\u00fcgen', equationEditor:'Gleichungseditor',
    equationError:'Gleichung enth\u00e4lt Fehler', editEquation:'Gleichung bearbeiten',
    latexPreview:'Vorschau', boardInsertEquation:'Gleichung einf\u00fcgen', equationPlaceholder:'LaTeX hier schreiben...',
      stats:'Statistiken', about:'\u00dcber', totalNotes:'Notizen insgesamt', totalBoards:'Pinnw\u00e4nde insgesamt',
      totalStudySets:'Lernsets insgesamt', totalPostits:'Post-its insgesamt', totalReminders:'Erinnerungen insgesamt',
      totalWords:'W\u00f6rter insgesamt', versionLabel:'Version', licenses:'Lizenzen', changelog:'\u00c4nderungsprotokoll',
      developer:'Entwickler', contact:'Kontakt', privacy:'Datenschutz', boardNoShadows:'Schatten ausblenden', reduceMotion:'Animationen reduzieren',
      weekStartsMonday:'Woche beginnt am Montag', defaultBoardBg:'Standard-Pinnwand-Hintergrund',
      boardBgLabel:'Pinnwand-Hintergrund', boardShadowsLabel:'Post-it-Schatten anzeigen',
      boardAnimationsLabel:'Animationen anzeigen', showStats:'Statistiken', showAbout:'\u00dcber',
      monday:'Montag', sunday:'Sonntag',
      import:'Importieren', importSuccess:'Element erfolgreich importiert',
      invalidFile:'Ung\u00fcltige oder besch\u00e4digte Datei',
      uuidConflict:'Ein Element mit dieser ID existiert bereits. Eine neue ID wird generiert.',
      exportNote:'Als Notiz exportieren', exportBoard:'Als Pinnwand exportieren', exportStudySet:'Als Kartenset exportieren',
      habits:'Gewohnheiten', habitsPending:'Gewohnheiten', habitsCompleted:'Erledigte Gewohnheiten', habitTask:'Aufgaben-Gewohnheit', habitCounter:'Zähler-Gewohnheit',
      habitName:'Name', habitDesc:'Beschreibung', habitIcon:'Symbol', habitColor:'Farbe', habitTotal:'Ziel', habitStep:'Schritt',
      habitStreak:'Serie', resetToday:'Heute zurücksetzen', editHabit:'Bearbeiten', deleteHabit:'Löschen',
      confirmDeleteHabit:'Diese Gewohnheit löschen?', habitNameRequired:'Name ist erforderlich.', habitTotalInvalid:'Ziel muss größer als 0 sein.', habitStepInvalid:'Schritt muss größer als 0 und nicht größer als Ziel sein.', habitStepIncoherent:'Schritt muss Ziel exakt erreichen (Ziel teilbar durch Schritt).', createHabit:'Erstellen', habitEmpty:'Noch keine Gewohnheiten. Tippe auf +.', habitNeedsTotal:'Ziel und Schritt für Zähler erforderlich.', habitCreateTitle:'Neue Gewohnheit', habitEditTitle:'Gewohnheit bearbeiten',

      registros:'Aufzeichnungen', registrosEmpty:'Noch keine Aufzeichnungen.', newRegistro:'Neue Aufzeichnung', editRegistro:'Aufzeichnung bearbeiten', deleteRegistro:'Aufzeichnung löschen', registroName:'Name', addVariable:'Variable hinzufügen', noRegistros:'Keine Aufzeichnungen.', confirmDeleteRegistro:'Diese Aufzeichnung löschen?', confirmDeleteVariable:'Diese Variable löschen?', registroNameRequired:'Name ist erforderlich.', registroExists:'Eine Aufzeichnung mit diesem Namen existiert bereits.', variableExists:'Eine Variable mit diesem Namen existiert bereits.', invalidRegistroName:'Ungültiger Name.', variableNameRequired:'Variablenname ist erforderlich.', invalidType:'Ungültiger Typ.', variableType:'Typ', registroCreateTitle:'Neue Aufzeichnung', registroEditTitle:'Aufzeichnung bearbeiten', registroDeleteMsg:'Alle Variablen und Verläufe werden gelöscht.', exportRegistro:'Aufzeichnung exportieren', importRegistro:'Aufzeichnung importieren', typeInt:'int', typeFloat:'float', typeBool:'bool', typeTexto:'texto', totalRegistros:'Aufzeichnungen gesamt', fromDate:'Von', toDate:'Bis', clearFilter:'Löschen', invalidDate:'Ungültiges Datum.', invalidRange:'Ungültiger Bereich.', valueMismatch:'Wert passt nicht zum Typ.', registroNotFound:'Aufzeichnung nicht gefunden.', variableNotFound:'Variable nicht gefunden.', trashTypeRegistro:'Aufzeichnung', folder:'Ordner', folders:'Ordner', newFolder:'Neuer Ordner', newFolderLabel:'Neuer Ordner', folderName:'Ordnername', folderNamePlaceholder:'Ordnername', protectedFolder:'Geschützter Ordner: ', deleteFolder:'Ordner löschen: ', deleteFolderMsg:'Die {n} Notizen werden in die Hauptansicht verschoben.', deleteFolderEmpty:'Der Ordner ist leer.', emptyFolderHint:'Dieser Ordner ist leer. Tippe auf +, um eine Notiz zu erstellen.', subfoldersNotAllowed:'Unterordner sind nicht erlaubt.', moveToFolder:'In Ordner verschieben', moveToNotes:'Zu Notizen verschieben', changePassword:'Passwort ändern', invalidFolder:'Ungültiger Ordner.', enterFolderId:'Ordner-ID eingeben:', countNote:'Notiz', countNotes:'Notizen', renameFolder:'Ordner umbenennen', folderExists:'Ordner existiert bereits'    },
  it: {
    notes:'Note', diary:'Diario', board:'Lavagna', boards:'Lavagne', studyCards:'Carte di studio', settings:'Impostazioni', rename:'Rinomina',
    newSet:'Nuovo set', editSet:'Modifica set', deleteSet:'Elimina set', addCard:'Aggiungi carta',
    front:'Fronte', back:'Retro', know:'So', dontKnow:'Non so',
    noCards:'Nessuna carta', study:'Studia', edit:'Modifica', del:'Elimina',
    setName:'Nome set', enterSetName:'Inserisci nome', cardList:'Carte', backToSets:'Indietro', showAnswer:'Clicca per vedere',
    darkTheme:'Tema scuro', lightTheme:'Tema chiaro',
    cancel:'Annulla', create:'Crea', confirm:'Conferma', close:'Chiudi', understood:'Capito',
    newNote:'Nuova Nota', newBoard:'Nuova Lavagna', title:'Titolo', name:'Nome',
    passwordOptional:'Password (opzionale)', enterPassword:'Inserisci password',
    protectedNote:'Nota protetta: ', protectedBoard:'Lavagna protetta: ',
    deleteNote:'Elimina nota: ', deleteBoard:'Elimina lavagna: ',
    noteInFavorites:'Nota nei preferiti',
    unfavoriteToDelete:'Rimuovila dai preferiti prima di eliminare.',
    wrongPassword:'Password errata',
    addFav:'Aggiungi ai preferiti', removeFav:'Rimuovi dai preferiti',
    exportPdf:'Esporta PDF', connect:'Collega',
     addItem:'Aggiungi elemento', addText:'Aggiungi testo', insertImage:'Inserisci immagine', voiceNote:'Nota vocale',
    addCover:'Aggiungi copertina', removeCover:'Rimuovi copertina', coverTooLarge:'Immagine troppo grande. Max 5MB.',
    bold:'Grassetto (Ctrl+B)', italic:'Corsivo (Ctrl+I)', underline:'Sottolineato (Ctrl+U)', highlight:'Evidenziare', bulletList:'Elenco puntato', numberedList:'Elenco numerato',
    bg:'Sfondo', postit:'Post-it', cork:'Sughero', white:'Bianco', black:'Nero', green:'Verde (lavagna)', exportToPdf:'Esporta PDF', export:'Esporta', studyCards:'Carte di studio',
    noteTitlePlaceholder:'Titolo nota', boardNamePlaceholder:'Nome lavagna', leaveEmpty:'Lascia vuoto se senza password',
    passwordProtected:'Protetta da password', noContent:'Nessun contenuto',
    noNotes:'Ancora nessuna nota.', noBoards:'Ancora nessuna lavagna.', noDiaryEntries:'Nessuna voce nel diario.',
    newNoteLabel:'Nuova nota', newBoardLabel:'Nuova lavagna',
    addItemsPrompt:'Aggiungi elementi alla tua nota',
    textPlaceholder:'Scrivi il testo qui...', itemPlaceholder:'Scrivi qui...',
    back:'Indietro', selectNote:'Seleziona o crea una nota',
    selectBoard:'Seleziona o crea una lavagna',
    exported:'Esportato: ', printError:'Errore di stampa', processingExport:'La tua nota sta venendo elaborata',
    needPostits:'Servono almeno 2 post-it',
    clickDestiny:'Clicca sul post-it di destinazione',
    connectionCreated:'Connessione creata', connectionExists:'Connessione gia esistente',
    chooseOther:'Scegli un altro post-it',
    diarySection:'Diario', language:'Idioma',
    cafecitoDesc:'La Biblioteca di Babele e infinita. Le risorse per svilupparla no. Se MiBabel ti e utile, puoi aiutare a continuare a costruirla.',
    libro:'Un libro', estante:'Una mensola', galeria:'Una galleria', salaBabel:'Una sala di Babele',
    trash:'Cestino', trashEmpty:'Il cestino \u00e8 vuoto.', trashSubtitle:'Gli elementi eliminati vengono automaticamente rimossi dopo 30 giorni.',
    restore:'Ripristina', deletePermanent:'Elimina', confirmDeletePermanent:'Eliminare definitivamente?',
    trashDaysLeft:'Eliminato tra ', trashDaysUnit:' giorno(i)', trashDeletedSoon:'Sar\u00e0 eliminato a breve',
    trashTypeNote:'Nota', trashTypeBoard:'Lavagna', trashTypeStudySet:'Carte di studio',
    linkHelpTitle:'Collegamenti tra note e URL', linkToNote:'Collega a un\'altra nota', linkToUrl:'Collega a un URL esterno',
    diaryPwdLabel:'Password del diario', diaryPwdSet:'\uD83D\uDD12 Password impostata', diaryPwdChange:'Cambia', diaryPwdRemove:'Rimuovi', diaryPwdNone:'Nessuna password', diaryPwdSetBtn:'Imposta',
    diaryPwdSetTitle:'Imposta password del diario', diaryPwdChangeTitle:'Cambia password del diario', diaryPwdRemoveTitle:'Rimuovi password del diario',
    diaryPwdOldLabel:'Password attuale', diaryPwdNewLabel:'Nuova password',
    diaryPwdAlertEmpty:'Inserisci una password.', diaryPwdAlertWrong:'Password attuale errata.', diaryPwdAlertNewEmpty:'Inserisci la nuova password.',
    diaryProtected:'Le note del diario sono protette', diaryForgotPwd:'Password dimenticata?',
    recoveryPrompt:'Inserisci il codice di recupero:', recoveryWrong:'Codice errato.',
    recoveryDialogTitle:'Codice di recupero', recoveryDialogMsg:'Conserva questo codice in un luogo sicuro. Se dimentichi la password, potrai usarlo per recuperare l\'accesso alle tue note del diario.', recoveryDialogBtn:'L\'ho salvato',
    migrateLabel:'Migrare i dati', exportBtn:'Esporta dati', importBtn:'Importa dati',
    save:'Salva', preview:'Anteprima:', insert:'Inserisci', newSetTitle:'Nuovo set',
    insertTable:'Tabella', mergeCells:'Unisci', splitCell:'Dividi', alignLeft:'Sinistra', alignCenter:'Centro', alignRight:'Destra', alignJustify:'Giustifica', tableRows:'Righe', tableCols:'Colonne', createTable:'Crea',
    months:['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'],
    dayAbbr:['Do','Lu','Ma','Me','Gi','Ve','Sa'],
    searchDate:'Cerca data (gg/mm/aaaa)',
    checkDownloads:'Controlla la cartella Download',
    welcomeTitle:'Benvenuto su MiBabel',
    welcomeMsg:'Ti do il benvenuto a MiBabel, un progetto indipendente creato da me, uno studente appassionato di conoscenza.<br><br>MiBabel \u00e8 nato principalmente pensando agli studenti. Grazie alla sua semplicit\u00e0 e ai suoi vari strumenti, cerca di diventare un compagno di studio e organizzazione. Tuttavia, \u00e8 aperto a chiunque desideri ordinare le proprie idee, progetti e apprendimenti.<br><br>Il suo nome \u00e8 ispirato a \u00abLa biblioteca di Babele\u00bb, il celebre racconto dello scrittore e poeta argentino Jorge Luis Borges, che immagina una biblioteca infinita capace di contenere tutti i libri possibili.<br><br><i>\u00abLa Biblioteca \u00e8 una sfera il cui centro esatto \u00e8 un qualsiasi esagono, la cui circonferenza \u00e8 inaccessibile.\u00bb</i><br><br>Frammento da \u00abLa biblioteca di Babele\u00bb, di Jorge Luis Borges.<br><br>MiBabel \u00e8 un\u2019applicazione gratuita, privata e progettata per essere utile. Se la trovi preziosa, puoi contribuire al suo sviluppo e aiutare questa biblioteca a continuare a crescere.',
    milestoneMsg:'Se MiBabel ti \u00e8 utile, ti invito a contribuire affinch\u00e9 questa biblioteca continui a crescere.',
    milestoneBtn:'Non ora',
     event:'Evento', task:'Compito', remindMe:'Ricordami',
    everyWeek:'Ogni settimana', everyMonth:'Ogni mese', everyYear:'Ogni anno', everyDay:'Ogni giorno', time:'Ora', testNotif:'Prova notifica', testNotifSent:'Notifica programmata tra 15 secondi', testNotifDenied:'Le notifiche sono disattivate. Attivale nelle impostazioni di sistema.', testNotifUnsupported:'Le notifiche non sono disponibili qui.', testNotifBody:'Notifica di prova',
    noRepeat:'Nessuna ripetizione', pending:'In sospeso', completed:'Completata', type:'Tipo', repeat:'Ripetizione',
    insertEquation:'Inserisci equazione', equationEditor:'Editor equazione',
    equationError:'L\'equazione contiene errori', editEquation:'Modifica equazione',
    latexPreview:'Anteprima', boardInsertEquation:'Inserisci equazione', equationPlaceholder:'Scrivi LaTeX qui...',
      stats:'Statistiche', about:'Informazioni', totalNotes:'Totale note', totalBoards:'Totale lavagne',
      totalStudySets:'Totale set', totalPostits:'Totale post-it', totalReminders:'Totale promemoria',
      totalWords:'Totale parole', versionLabel:'Versione', licenses:'Licenze', changelog:'Registro modifiche',
      developer:'Sviluppatore', contact:'Contatto', privacy:'Privacy', boardNoShadows:'Nascondi ombre', reduceMotion:'Riduci animazioni',
      weekStartsMonday:'La settimana inizia luned\u00ec', defaultBoardBg:'Sfondo lavagna predefinito',
      boardBgLabel:'Sfondo lavagna', boardShadowsLabel:'Mostra ombre post-it',
      boardAnimationsLabel:'Mostra animazioni', showStats:'Statistiche', showAbout:'Informazioni',
      monday:'Luned\u00ec', sunday:'Domenica',
      import:'Importa', importSuccess:'Elemento importato con successo',
      invalidFile:'File non valido o danneggiato',
      uuidConflict:'Esiste gi\u00e0 un elemento con questo ID. Verr\u00e0 generato un nuovo ID.',
      exportNote:'Esporta come nota', exportBoard:'Esporta come lavagna', exportStudySet:'Esporta come set',
      habits:'Abitudini', habitsPending:'Abitudini', habitsCompleted:'Abitudini completate', habitTask:'Abitudine compito', habitCounter:'Abitudine contatore',
      habitName:'Nome', habitDesc:'Descrizione', habitIcon:'Icona', habitColor:'Colore', habitTotal:'Obiettivo', habitStep:'Passo',
      habitStreak:'Serie', resetToday:'Reimposta oggi', editHabit:'Modifica', deleteHabit:'Elimina',
      confirmDeleteHabit:'Eliminare questa abitudine?', habitNameRequired:'Il nome è obbligatorio.', habitTotalInvalid:'L\'obiettivo deve essere maggiore di 0.', habitStepInvalid:'Il passo deve essere maggiore di 0 e non maggiore dell\'obiettivo.', habitStepIncoherent:'Il passo deve permettere di raggiungere l\'obiettivo esattamente (obiettivo divisibile per passo).', createHabit:'Crea', habitEmpty:'Nessuna abitudine. Tocca + per crearne una.', habitNeedsTotal:'Obiettivo e Passo richiesti per contatore.', habitCreateTitle:'Nuova abitudine', habitEditTitle:'Modifica abitudine',

      registros:'Registri', registrosEmpty:'Nessun registro ancora.', newRegistro:'Nuovo registro', editRegistro:'Modifica registro', deleteRegistro:'Elimina registro', registroName:'Nome', addVariable:'Aggiungi variabile', noRegistros:'Nessun registro.', confirmDeleteRegistro:'Eliminare questo registro?', confirmDeleteVariable:'Eliminare questa variabile?', registroNameRequired:'Il nome è obbligatorio.', registroExists:'Esiste già un registro con questo nome.', variableExists:'Esiste già una variabile con questo nome.', invalidRegistroName:'Nome non valido.', variableNameRequired:'Il nome della variabile è obbligatorio.', invalidType:'Tipo non valido.', variableType:'Tipo', registroCreateTitle:'Nuovo registro', registroEditTitle:'Modifica registro', registroDeleteMsg:'Tutte le variabili e la cronologia verranno eliminate.', exportRegistro:'Esporta registro', importRegistro:'Importa registro', typeInt:'int', typeFloat:'float', typeBool:'bool', typeTexto:'texto', totalRegistros:'Registri totali', fromDate:'Da', toDate:'A', clearFilter:'Cancella', invalidDate:'Data non valida.', invalidRange:'Intervallo non valido.', valueMismatch:'Valore non compatibile.', registroNotFound:'Registro non trovato.', variableNotFound:'Variabile non trovata.', trashTypeRegistro:'Registro', folder:'Cartella', folders:'Cartelle', newFolder:'Nuova cartella', newFolderLabel:'Nuova cartella', folderName:'Nome cartella', folderNamePlaceholder:'Nome cartella', protectedFolder:'Cartella protetta: ', deleteFolder:'Elimina cartella: ', deleteFolderMsg:'Le {n} note verranno spostate nella vista principale.', deleteFolderEmpty:'La cartella è vuota.', emptyFolderHint:'Questa cartella è vuota. Tocca + per creare una nota.', subfoldersNotAllowed:'Le sottocartelle non sono consentite.', moveToFolder:'Sposta in cartella', moveToNotes:'Sposta in Note', changePassword:'Cambia password', invalidFolder:'Cartella non valida.', enterFolderId:'Inserisci ID cartella:', countNote:'nota', countNotes:'note', renameFolder:'Rinomina cartella', folderExists:'La cartella esiste già'    }
};
function t(key) { var l = langData[state.lang] || langData.en; return l[key] || key; }
function setLang(code) { state.lang = code; save(); applyLang(); applyTheme(); renderAll(); document.documentElement.lang = code; }
function fmtDate(ts) { if (!ts) return ''; var d = new Date(ts); return d.toLocaleDateString(); }
var Directory = {
  Documents: "DOCUMENTS",
  Data: "DATA",
  Library: "LIBRARY",
  Cache: "CACHE",
  External: "EXTERNAL",
  ExternalStorage: "EXTERNAL_STORAGE",
  ExternalCache: "EXTERNAL_CACHE",
  LibraryNoCloud: "LIBRARY_NO_CLOUD",
  Temporary: "TEMPORARY"
};


function saveFile(nombre, data, mime) {
  var p;
  if (typeof data === 'string') {
    p = Promise.resolve(btoa(unescape(encodeURIComponent(data))));
  } else if (data instanceof Uint8Array) {
    var binary = '';
    for (var i = 0; i < data.length; i++) binary += String.fromCharCode(data[i]);
    p = Promise.resolve(btoa(binary));
  } else if (data instanceof Blob) {
    p = new Promise(function(resolve, reject) {
      var reader = new FileReader();
      reader.onload = function() { resolve(reader.result.split(',')[1]); };
      reader.onerror = function() { reject(reader.error); };
      reader.readAsDataURL(data);
    });
  } else {
    p = Promise.reject('Unsupported data type');
  }
  return p.then(function(base64) {
    if (window.AndroidDownloader) {
      window.AndroidDownloader.save(nombre, base64, mime);
      showToast(t('checkDownloads'));
    } else {
      var dataUrl = 'data:' + (mime || 'application/octet-stream') + ';base64,' + base64;
      var a = document.createElement('a');
      a.href = dataUrl;
      a.download = nombre;
      document.body.appendChild(a);
      a.click();
      setTimeout(function() { document.body.removeChild(a); }, 100);
    }
  }).catch(function(err) {
    console.error('Error exporting file:', err);
    setStatus('Error al exportar: ' + (err.message || JSON.stringify(err)));
  });
}

function _collectMediaRefsFromItem(item, type) {
  var refs = {};
  if (type === 'note' && item.items) {
    item.items.forEach(function(it) {
      var itRef = it.src || it.ref;
      if (itRef && (it.type === 'image' || it.type === 'audio' || it.type === 'video')) refs[itRef] = true;
    });
  }
  if (type === 'board') {
    if (item.postits) item.postits.forEach(function(p) {
      if (p.text) {
        var m = p.text.match(/<img[^>]+src="([^"]+)"/g);
        if (m) m.forEach(function(t) { var s = t.match(/src="([^"]+)"/); if (s && s[1]) refs[s[1]] = true; });
      }
    });
    if (item.elements) item.elements.forEach(function(el) { if (el.ref) refs[el.ref] = true; });
  }
  if (type === 'studySet' && item.cards) {
    item.cards.forEach(function(c) {
      ['front','back'].forEach(function(field) {
        if (c[field]) {
          var m = c[field].match(/<img[^>]+src="([^"]+)"/g);
          if (m) m.forEach(function(t) { var s = t.match(/src="([^"]+)"/); if (s && s[1]) refs[s[1]] = true; });
        }
      });
    });
  }
  return Object.keys(refs);
}

function exportItem(item, type) {
  var name = sanitizeFilename(item.title || item.name || type);
  var pkg = {
    formatVersion: 2,
    type: type,
    app: 'AppNotas',
    exportedAt: new Date().toISOString(),
    hasEmbeddedMedia: true,
    _media: {},
    data: JSON.parse(JSON.stringify(item))
  };
  var refs = _collectMediaRefsFromItem(item, type);
  if (refs.length === 0) {
    var jsonStr = JSON.stringify(pkg, null, 2);
    saveFile(name + '.json', jsonStr, 'application/json');
    return;
  }
  setStatus('Recopilando archivos multimedia...');
  var promises = refs.map(function(ref) {
    return ImageManager.read(ref).then(function(base64) {
      if (base64) pkg._media[ref] = base64;
    });
  });
  Promise.all(promises).then(function() {
    var jsonStr = JSON.stringify(pkg, null, 2);
    return saveFile(name + '.json', jsonStr, 'application/json');
  }).catch(function(err) {
    setStatus('Error al exportar: ' + (err.message || JSON.stringify(err)));
  });
}

function exportSingleNote(id) {
  var note = state.notes.find(function(n) { return n.id === id; });
  if (note) exportItem(note, 'note');
}

function exportSingleBoard(id) {
  var board = state.boards.find(function(b) { return b.id === id; });
  if (board) exportItem(board, 'board');
}

function exportSingleStudySet(id) {
  var set = state.studySets.find(function(s) { return s.id === id; });
  if (set) exportItem(set, 'studySet');
}
function exportSingleFolder(id){
  var folder=getFolderById(id); if(!folder) return;
  var notes=state.notes.filter(function(n){return n.folderId===id;});
  var pkg={ formatVersion:2, type:'folder', app:'AppNotas', exportedAt:new Date().toISOString(), data: JSON.parse(JSON.stringify(folder)), notes: JSON.parse(JSON.stringify(notes)), hasEmbeddedMedia:true, _media:{} };
  var refs=[];
  notes.forEach(function(n){ (n.items||[]).forEach(function(it){ var r=it.src||it.ref; if((it.type==='image'||it.type==='audio'||it.type==='video')&&r) refs.push(r); }); });
  if(refs.length===0){ saveFile(sanitizeFilename(folder.name||'folder')+'.json', JSON.stringify(pkg,null,2), 'application/json'); return; }
  Promise.all(refs.map(function(ref){ return ImageManager.read(ref).then(function(b64){ if(b64) pkg._media[ref]=b64; }); })).then(function(){
    saveFile(sanitizeFilename(folder.name||'folder')+'.json', JSON.stringify(pkg,null,2), 'application/json');
  });
}

function exportData() {
  var manifest = {
    formatVersion: 5,
    app: 'AppNotas',
    createdAt: new Date().toISOString(),
    notesCount: state.notes.length,
    foldersCount: (state.folders||[]).length
  };
  var config = {
    boards: state.boards,
    studySets: state.studySets,
    trash: state.trash,
    habits: state.habits,
    registros: state.registros || [],
    activeRegistroId: state.activeRegistroId || null,
    registrosFilter: state.registrosFilter || { from: null, to: null },
    diaryVariables: state.diaryVariables || {},
    view: state.view,
    theme: state.theme,
    lang: state.lang,
    nextId: state.nextId,
    activeNoteId: state.activeNoteId,
    activeBoardId: state.activeBoardId,
    activeStudySetId: state.activeStudySetId,
    _exportCount: state._exportCount,
    _triggeredMilestones: state._triggeredMilestones,
    diaryPwdHash: state.diaryPwdHash,
    diaryRecoveryCode: state.diaryRecoveryCode,
    firstVisit: state.firstVisit,
    weekStartsMonday: state.weekStartsMonday,
    defaultBoardBg: state.defaultBoardBg,
    boardShowShadows: state.boardShowShadows,
    boardShowAnimations: state.boardShowAnimations,
    folders: state.folders || [],
    rootOrder: state.rootOrder || [],
    activeFolderId: state.activeFolderId || null
  };
  state.lastBackupAt = Date.now();
  save();
  var zip = new JSZip();
  zip.file('manifest.json', JSON.stringify(manifest, null, 2));
  zip.file('notas.json', JSON.stringify(state.notes, null, 2));
  zip.file('configuracion.json', JSON.stringify(config, null, 2));
  var now = new Date();
  var ys = now.getFullYear();
  var ms = String(now.getMonth() + 1).padStart(2, '0');
  var ds = String(now.getDate()).padStart(2, '0');
  var fileName = 'Backup_' + ys + '-' + ms + '-' + ds + '.anbk';
  setStatus('Generando copia de seguridad...');
  var usedRefs = ImageManager.collectUsedRefs();
  var imgLoadPromises = usedRefs.map(function(ref) {
    return ImageManager.read(ref).then(function(base64) {
      if (base64) {
        zip.file(ref, base64, { base64: true, createFolders: true });
      }
    });
  });
  Promise.all(imgLoadPromises).then(function() {
    return zip.generateAsync({ type: 'uint8array' });
  }).then(function(content) {
    var binary = '';
    for (var i = 0; i < content.length; i++) binary += String.fromCharCode(content[i]);
    var base64 = btoa(binary);
    if (window.AndroidDownloader) {
      window.AndroidDownloader.save(fileName, base64, 'application/zip');
      showToast(t('checkDownloads'));
      setStatus('Copia de seguridad guardada en Downloads');
    } else {
      var dataUrl = 'data:application/octet-stream;base64,' + base64;
      var a = document.createElement('a');
      a.href = dataUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      setTimeout(function() { document.body.removeChild(a); }, 100);
      setStatus('Descargando copia de seguridad...');
    }
  }).catch(function(err) {
    setStatus('Error al crear copia de seguridad: ' + (err.message || JSON.stringify(err)));
  });
}
function importData(input) {
  if (!input.files || !input.files[0]) return;
  var file = input.files[0];
  var reader = new FileReader();
  reader.onload = function(e) {
    var dataUrl = e.target.result;
    var commaIndex = dataUrl.indexOf(',');
    if (commaIndex < 0) {
      alert('El archivo está corrupto o no es un ZIP válido.');
      return;
    }
    var base64 = dataUrl.substring(commaIndex + 1);
    JSZip.loadAsync(base64, { base64: true }).then(function(zip) {
      var manifestFile = zip.file('manifest.json');
      if (!manifestFile) {
        alert('El archivo no corresponde a una copia de seguridad válida de AppNotas.');
        return;
      }
      return manifestFile.async('string').then(function(manifestStr) {
        var manifest = JSON.parse(manifestStr);
        var version = manifest.formatVersion || 1;
        if (version !== 1 && version !== 2 && version !== 3 && version !== 4 && version !== 5) {
          alert('Este archivo fue creado con una versión incompatible de la aplicación.');
          return;
        }
        var notasFile = zip.file('notas.json');
        var configFile = zip.file('configuracion.json');
        if (!notasFile || !configFile) {
          alert('El archivo está corrupto: falta ' + (!notasFile ? 'notas.json' : 'configuracion.json'));
          return;
        }
        return Promise.all([
          notasFile.async('string'),
          configFile.async('string')
        ]).then(function(results) {
          return { notas: JSON.parse(results[0]), config: JSON.parse(results[1]), zip: zip };
        });
      });
    }).then(function(data) {
      if (!data) return;
      var notas = data.notas, config = data.config, zip = data.zip;
      if (!notas || !config) {
        alert('El archivo está corrupto: no se pudieron interpretar los datos.');
        return;
      }
      if (!confirm('Se reemplazarán todos los datos actuales. ¿Continuar?')) return;
      /* Extraer medios (imágenes, audio, video) del backup antes de reemplazar estado */
      var missingImages = [];
      var mediaEntries = [];
      zip.forEach(function(relPath, zipEntry) {
        if (!zipEntry.dir && (relPath.indexOf('imagenes/') === 0 || relPath.indexOf('audios/') === 0 || relPath.indexOf('videos/') === 0)) {
          mediaEntries.push(relPath);
        }
      });
      var imgRestorePromises = mediaEntries.map(function(imgRef) {
        return zip.file(imgRef).async('base64').then(function(imgBase64) {
          return ImageManager.save(imgRef, imgBase64);
        }).catch(function(err) {
          missingImages.push(imgRef);
          console.warn('Error restoring media:', imgRef, err);
        });
      });
      return Promise.all(imgRestorePromises).then(function() {
        state.notes = notas || [];
        state.notes.forEach(function(n) { if (!n.events) n.events = []; if (!n.tasks) n.tasks = []; n.events = (n.events||[]).filter(function(e){ return e.repetition !== 'daily'; }); n.tasks = (n.tasks||[]).filter(function(t){ return t.repetition !== 'daily'; }); });
        state.boards = config.boards || [];
        state.studySets = config.studySets || [];
        state.trash = config.trash || [];
        state.habits = config.habits || [];
        state.registros = config.registros && Array.isArray(config.registros) ? config.registros : [];
        state.activeRegistroId = config.activeRegistroId || null;
        state.registrosFilter = config.registrosFilter && typeof config.registrosFilter === 'object' ? config.registrosFilter : { from: null, to: null };
        // Normalizar registros importados
        state.registros.forEach(function(r){
          if (!r.fields) r.fields=[];
          if (!r.entries || typeof r.entries!=='object') r.entries={};
          if (!r.name) r.name='Registro';
          if (!r.id) r.id=genId();
        });
        state.diaryVariables = config.diaryVariables && typeof config.diaryVariables === 'object' && !Array.isArray(config.diaryVariables) ? config.diaryVariables : {};
        // Sanitizar diaryVariables importadas
        for (var _ik in state.diaryVariables) if (Object.prototype.hasOwnProperty.call(state.diaryVariables,_ik)) {
          var _a = state.diaryVariables[_ik];
          if (!Array.isArray(_a)) { state.diaryVariables[_ik]=[]; continue; }
          _a.sort(function(a,b){ return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });
        }
        state.view = config.view || 'notes';
        state.theme = config.theme || 'dark';
        state.lang = config.lang || 'en';
        state.nextId = config.nextId || Date.now();
        state.activeNoteId = config.activeNoteId || null;
        state.activeBoardId = config.activeBoardId || null;
        state.activeStudySetId = config.activeStudySetId || null;
        state._exportCount = config._exportCount || 0;
        state._triggeredMilestones = config._triggeredMilestones || [];
        state.diaryPwdHash = config.diaryPwdHash || '';
        state.diaryRecoveryCode = config.diaryRecoveryCode || '';
        state.firstVisit = config.firstVisit !== undefined ? config.firstVisit : false;
        // Carpetas
        state.folders = config.folders && Array.isArray(config.folders) ? config.folders : [];
        state.rootOrder = config.rootOrder && Array.isArray(config.rootOrder) ? config.rootOrder : [];
        state.activeFolderId = config.activeFolderId || null;
        // Normalizar notas con folderId y carpetas
        state.notes.forEach(function(n){ if(n.folderId===undefined) n.folderId=null; });
        state.folders.forEach(function(f){ if(!f.name) f.name='Carpeta'; if(f.pwdHash===undefined) f.pwdHash=''; if(!f.createdAt) f.createdAt=Date.now(); });
        // validar huérfanos
        (function(){
          var validFolderIds={}; state.folders.forEach(function(f){ validFolderIds[f.id]=true; });
          state.notes.forEach(function(n){ if(n.folderId!=null && !validFolderIds[n.folderId]) n.folderId=null; });
          ensureRootOrder();
          if(state.activeFolderId!=null && !validFolderIds[state.activeFolderId]) state.activeFolderId=null;
        })();
        save();
        closeDialog('settingsDialog');
        renderAll();
        if (missingImages.length > 0) {
          alert('Datos restaurados. Faltaron ' + missingImages.length + ' archivo(s) multimedia que no pudieron restaurarse. Revisa la consola para más detalles.');
        } else {
          alert('Datos restaurados correctamente.');
        }
      });
    }).catch(function(err) {
      setStatus('');
      console.error('Import error:', err);
      alert('El archivo está corrupto o no es un ZIP válido.');
    });
  };
  reader.readAsDataURL(file);
  input.value = '';
}
function importSingleItem(input) {
  if (!input.files || !input.files[0]) return;
  var file = input.files[0];
  var reader = new FileReader();
  reader.onload = function(e) {
    var jsonStr = e.target.result;
    var pkg;
    try { pkg = JSON.parse(jsonStr); } catch(e) { alert(t('invalidFile')); return; }
    if (!pkg || !pkg.type || !pkg.data || !pkg.data.id) { alert(t('invalidFile')); return; }
    if (pkg.formatVersion !== 1 && pkg.formatVersion !== 2 && pkg.formatVersion !== 3) { alert(t('invalidFile')); return; }
    var type = pkg.type;
    var data = pkg.data;
    if (type === 'note' && !data.title) { alert(t('invalidFile')); return; }
    if (type === 'board' && !data.name) { alert(t('invalidFile')); return; }
    if (type === 'studySet' && !data.name) { alert(t('invalidFile')); return; }
    if (type === 'registro' && !data.name) { alert(t('invalidFile')); return; }
    if (type === 'folder' && !data.name) { alert(t('invalidFile')); return; }
    if (type !== 'note' && type !== 'board' && type !== 'studySet' && type !== 'registro' && type !== 'folder') { alert(t('invalidFile')); return; }
    // Ensure note has folderId
    if(type==='note' && data.folderId===undefined) data.folderId=null;

    var restoreMedia = Promise.resolve();
    if (pkg.hasEmbeddedMedia && pkg._media) {
      restoreMedia = Promise.all(Object.keys(pkg._media).map(function(ref) {
        return ImageManager.save(ref, pkg._media[ref]).catch(function(err) {
          console.warn('Error restoring media:', ref, err);
        });
      }));
    }

    restoreMedia.then(function() {
      var existingArr, key;
      if (type === 'note') { existingArr = state.notes; key = 'title'; }
      else if (type === 'board') { existingArr = state.boards; key = 'name'; }
      else if (type === 'registro') { existingArr = state.registros; key = 'name'; }
      else if (type === 'folder') { existingArr = state.folders; key = 'name'; }
      else { existingArr = state.studySets; key = 'name'; }

      var conflict = existingArr.find(function(ex) { return ex.id === data.id; });
      if (conflict) {
        if (!confirm(t('uuidConflict'))) return;
        data.id = genId();
      }
      existingArr.push(data);
      if(type==='note'){
        if(data.folderId!=null && !getFolderById(data.folderId)) data.folderId=null;
        ensureRootOrder();
        if(data.folderId==null && !state.rootOrder.find(function(e){return e.type==='note'&&e.id===data.id;})){
          state.rootOrder.push({type:'note', id:data.id});
        }
      }
      if(type==='folder'){
        if(!state.rootOrder.find(function(e){return e.type==='folder'&&e.id===data.id;})){
          ensureRootOrder();
          state.rootOrder.push({type:'folder', id:data.id});
        }
        // also import embedded notes if folder pkg contains notes (future)
        if(pkg.notes && Array.isArray(pkg.notes)){
          pkg.notes.forEach(function(n){
            if(state.notes.find(function(ex){return ex.id===n.id;})) n.id=genId();
            n.folderId=data.id;
            state.notes.push(n);
          });
        }
      }
      save();
      renderAll();
      showToast(t('importSuccess'));
    });
  };
  reader.readAsText(file);
  input.value = '';
}
function generateRecoveryCode() {
  var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  var code = '';
  for (var i = 0; i < 8; i++) {
    if (i === 4) code += '-';
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}
function showDiaryRecoveryCode(code) {
  document.getElementById('recoveryCodeDisplay').textContent = code;
  showDialog('recoveryCodeDialog');
}
function setDiaryPassword() {
  document.getElementById('diaryPwdTitle').textContent = t('diaryPwdSetTitle');
  document.getElementById('diaryOldPwdField').style.display = 'none';
  document.getElementById('diaryNewPwdField').style.display = '';
  document.getElementById('diaryNewPwdInput').value = '';
  window._diaryPwdMode = 'set';
  showDialog('diaryPwdDialog');
  setTimeout(function(){ document.getElementById('diaryNewPwdInput').focus(); }, 100);
}
function changeDiaryPassword() {
  document.getElementById('diaryPwdTitle').textContent = t('diaryPwdChangeTitle');
  document.getElementById('diaryOldPwdField').style.display = '';
  document.getElementById('diaryOldPwdInput').value = '';
  document.getElementById('diaryNewPwdField').style.display = '';
  document.getElementById('diaryNewPwdInput').value = '';
  window._diaryPwdMode = 'change';
  showDialog('diaryPwdDialog');
  setTimeout(function(){ document.getElementById('diaryOldPwdInput').focus(); }, 100);
}
function removeDiaryPassword() {
  document.getElementById('diaryPwdTitle').textContent = t('diaryPwdRemoveTitle');
  document.getElementById('diaryOldPwdField').style.display = '';
  document.getElementById('diaryOldPwdInput').value = '';
  document.getElementById('diaryNewPwdField').style.display = 'none';
  window._diaryPwdMode = 'remove';
  showDialog('diaryPwdDialog');
  setTimeout(function(){ document.getElementById('diaryOldPwdInput').focus(); }, 100);
}
function confirmDiaryPwd() {
  var mode = window._diaryPwdMode;
  var newPwd = document.getElementById('diaryNewPwdInput').value;
  if (mode === 'set') {
    if (!newPwd) { alert(t('diaryPwdAlertEmpty')); return; }
    state.diaryPwdHash = hashPwd(newPwd);
    state.diaryRecoveryCode = generateRecoveryCode();
    closeDialog('diaryPwdDialog');
    save();
    renderDiaryPwdSection();
    showDiaryRecoveryCode(state.diaryRecoveryCode);
  } else {
    var oldPwd = document.getElementById('diaryOldPwdInput').value;
    if (hashPwd(oldPwd) !== state.diaryPwdHash) { alert(t('diaryPwdAlertWrong')); return; }
    if (mode === 'change') {
      if (!newPwd) { alert(t('diaryPwdAlertNewEmpty')); return; }
      state.diaryPwdHash = hashPwd(newPwd);
      state.diaryRecoveryCode = generateRecoveryCode();
      closeDialog('diaryPwdDialog');
      save();
      renderDiaryPwdSection();
      showDiaryRecoveryCode(state.diaryRecoveryCode);
    } else if (mode === 'remove') {
      state.diaryPwdHash = '';
      state.diaryRecoveryCode = '';
      diaryUnlocked = false;
      closeDialog('diaryPwdDialog');
      save();
      renderDiaryPwdSection();
    }
  }
}
function renderDiaryPwdSection() {
  var status = document.getElementById('diaryPwdStatus');
  var actions = document.getElementById('diaryPwdActions');
  if (!status || !actions) return;
  if (state.diaryPwdHash) {
    status.innerHTML = '<span style="color:var(--accent);font-size:13px;">&#x1f512; ' + t('diaryPwdSet') + '</span>';
    actions.innerHTML = '<button class="btn" onclick="changeDiaryPassword()">' + t('diaryPwdChange') + '</button><button class="btn" onclick="removeDiaryPassword()">' + t('diaryPwdRemove') + '</button>';
  } else {
    status.innerHTML = '<span style="color:var(--text-muted);font-size:13px;">' + t('diaryPwdNone') + '</span>';
    actions.innerHTML = '<button class="btn" onclick="setDiaryPassword()">' + t('diaryPwdSetBtn') + '</button>';
  }
}
function diaryUnlockFlow() {
  if (!state.diaryPwdHash) return true;
  if (diaryUnlocked) return true;
  pendingUnlock = { type: 'diary', id: null };
  document.getElementById('unlockPwdInput').value = '';
  document.getElementById('unlockPwdInput').style.display = '';
  document.getElementById('unlockTitle').textContent = t('diaryProtected');
  document.getElementById('unlockMsg').style.display = '';
  document.getElementById('unlockMsg').innerHTML = '<a href="#" onclick="event.preventDefault();recoverDiaryAccess();" style="color:var(--accent);font-size:12px;">' + t('diaryForgotPwd') + '</a>';
  document.getElementById('unlockConfirmBtn').textContent = t('confirm');
  showDialog('unlockDialog');
  setTimeout(function(){ document.getElementById('unlockPwdInput').focus(); }, 100);
  return false;
}
function recoverDiaryAccess() {
  var code = prompt(t('recoveryPrompt'));
  if (!code) return;
  if (code.trim().toUpperCase() !== state.diaryRecoveryCode) {
    alert(t('recoveryWrong'));
    return;
  }
  state.diaryPwdHash = '';
  state.diaryRecoveryCode = '';
  diaryUnlocked = true;
  closeDialog('unlockDialog');
  pendingUnlock = null;
  save();
  renderDiaryPwdSection();
  switchView('diary');
}
function applyLang() {
  var l = function(id, key) { var el = document.getElementById(id); if (el) el.textContent = t(key); };
  var ml = function(id, key) { var el = document.querySelector('#' + id + ' .label'); if (el) el.textContent = t(key); };
  ml('menuNotes','notes'); ml('menuDiary','diary'); ml('menuBoard','board');
  var sm = document.getElementById('menuStudy');
  if (sm) sm.querySelector('.label').textContent = t('studyCards');
  var sl = document.querySelector('#menuSettings .settings-label');
  if (sl) sl.textContent = t('settings');
  var cm = document.getElementById('menuCafecito');
  if (cm) cm.querySelector('.label').textContent = 'Expandir la Biblioteca';
  document.getElementById('menuTheme').querySelector('.theme-label').textContent = state.theme === 'light' ? t('lightTheme') : t('darkTheme');
  l('newNoteTitleLabel','title'); l('newNotePwdLabel','passwordOptional');
  l('newFolderNameLabel','folderName'); l('newFolderPwdLabel','passwordOptional');
  var ctN=document.getElementById('createTabNoteLabel'); if(ctN){ var v=t('countNote'); ctN.textContent=v.charAt(0).toUpperCase()+v.slice(1); }
  var ctF=document.getElementById('createTabFolderLabel'); if(ctF){ var v2=t('folder'); ctF.textContent=v2.charAt(0).toUpperCase()+v2.slice(1); }
  var nfn=document.getElementById('newFolderName'); if(nfn) nfn.placeholder=t('folderNamePlaceholder');
  var nfp=document.getElementById('newFolderPwd'); if(nfp) nfp.placeholder=t('leaveEmpty');
  l('newFolderCreateBtn','create'); l('newFolderCancelBtn','cancel');
  l('newBoardNameLabel','name'); l('newBoardPwdLabel','passwordOptional');
  l('settingsLangLabel','language');
  var nnt = document.getElementById('newNoteTitle');
  if (nnt) nnt.placeholder = t('noteTitlePlaceholder');
  var nnp = document.getElementById('newNotePwd');
  if (nnp) nnp.placeholder = t('leaveEmpty');
  var nbn = document.getElementById('newBoardName');
  if (nbn) nbn.placeholder = t('boardNamePlaceholder');
  var nbp = document.getElementById('newBoardPwd');
  if (nbp) nbp.placeholder = t('leaveEmpty');
  l('newNoteTitle_','newNote'); l('newBoardTitle','newBoard');
  l('tableDialogTitle','insertTable');
  l('tableRowsLabel','tableRows');
  l('tableColsLabel','tableCols');
  l('tableCancelBtn','cancel');
  l('tableCreateBtn','createTable');
  // Unlock dialog
  l('unlockTitle','enterPassword');
  var uip = document.getElementById('unlockPwdInput');
  if (uip) uip.placeholder = t('enterPassword');
  // Empty states
  l('emptyNotesTitle','notes'); l('emptyNotesSub','selectNote');
  l('emptyBoardTitle','boards'); l('emptyBoardSub','selectBoard');
  // Back button
  var bb = document.getElementById('headerBackBtn');
  if (bb) bb.innerHTML = '&#x21A9;';
  // Buttons
  l('newNoteCancelBtn','cancel'); l('newNoteCreateBtn','create');
  l('newBoardCancelBtn','cancel'); l('newBoardCreateBtn','create');
  l('unlockCancelBtn','cancel'); l('unlockConfirmBtn','confirm');
  l('settingsDialogTitle','settings');
  l('linkHelpTitle','linkHelpTitle');
  l('linkToNoteDesc','linkToNote');
  l('linkToUrlDesc','linkToUrl');
  l('diaryPwdLabel','diaryPwdLabel');
  l('diaryOldPwdLabel','diaryPwdOldLabel');
  l('diaryNewPwdLabel','diaryPwdNewLabel');
  var dop = document.getElementById('diaryOldPwdInput');
  if (dop) dop.placeholder = t('diaryPwdOldLabel');
  var dnp = document.getElementById('diaryNewPwdInput');
  if (dnp) dnp.placeholder = t('diaryPwdNewLabel');
  l('diaryPwdCancelBtn','cancel');
  l('diaryPwdConfirmBtn','confirm');
  l('recoveryDialogTitle','recoveryDialogTitle');
  l('recoveryDialogMsg','recoveryDialogMsg');
  l('recoveryDialogBtn','recoveryDialogBtn');
  l('milestoneMsg','milestoneMsg');
  l('milestoneBtn','milestoneBtn');
  l('migrateLabel','migrateLabel');
  l('exportBtn','exportBtn');
  l('importBtn','importBtn');
  // Menu label for trash
  var mt = document.getElementById('menuTrash');
  if (mt) mt.querySelector('.label').textContent = t('trash');
  var scb = document.getElementById('settingsCloseBtn');
  if (scb) scb.textContent = t('close');
  // Study card dialog
  l('newStudySetTitle','newSetTitle');
  l('newStudySetNameLabel','name');
  l('newStudySetCancelBtn','cancel');
  l('newStudySetCreateBtn','create');
  l('studyCardTitle','addCard');
  l('studyCardFrontLabel','front');
  l('studyCardBackLabel','back');
  l('studyCardSaveBtn','save');
  l('studyCardCancelBtn','cancel');
  l('studyCardPreviewLabel','preview');
  l('studyCardPreviewInsertBtn','insert');
  l('studyCardPreviewCancelBtn','cancel');
  var scf = document.getElementById('studyCardFront');
  if (scf) scf.dataset.placeholder = t('front');
  var scbk = document.getElementById('studyCardBack');
  if (scbk) scbk.dataset.placeholder = t('back');
  var nsn = document.getElementById('newStudySetName');
  if (nsn) nsn.placeholder = t('setName');
  var ibf = document.getElementById('studyCardImgBtnFront');
  if (ibf) ibf.title = t('insertImage');
  var ibb = document.getElementById('studyCardImgBtnBack');
  if (ibb) ibb.title = t('insertImage');
  // Welcome dialog
  l('welcomeTitle','welcomeTitle');
  l('welcomeLangLabel','language');
  var wm = document.getElementById('welcomeMsg');
  if (wm) wm.innerHTML = t('welcomeMsg');
  var wge = document.getElementById('welcomeGotItBtn');
  if (wge) wge.textContent = t('understood');
  var wls = document.getElementById('welcomeLangSelect');
  if (wls) wls.value = state.lang || 'en';
  /* Hábitos menu */
  var mh = document.getElementById('menuHabitsLabel');
  if (mh) mh.textContent = t('habits');
  var rmL = document.getElementById('menuRegistrosLabel');
  if (rmL) rmL.textContent = t('registros');
  /* Hábitos dialog */
  var hdl = document.getElementById('habitDialogTitle');
  if (hdl) hdl.textContent = state._editingHabitId ? t('habitEditTitle') : t('habitCreateTitle');
  var htl = document.getElementById('habitTypeLabel');
  if (htl) htl.textContent = t('type');
  var htto = document.getElementById('habitTypeTaskOpt');
  if (htto) htto.textContent = t('habitTask');
  var htco = document.getElementById('habitTypeCounterOpt');
  if (htco) htco.textContent = t('habitCounter');
  var hnl = document.getElementById('habitNameLabel');
  if (hnl) hnl.textContent = t('habitName') + ' *';
  var hdl2 = document.getElementById('habitDescLabel');
  if (hdl2) hdl2.textContent = t('habitDesc');
  var hil = document.getElementById('habitIconLabel');
  if (hil) hil.textContent = t('habitIcon');
  var hcl = document.getElementById('habitColorLabel');
  if (hcl) hcl.textContent = t('habitColor');
  var htot = document.getElementById('habitTotalLabel');
  if (htot) htot.textContent = t('habitTotal') + ' *';
  var hsll = document.getElementById('habitStepLabel');
  if (hsll) hsll.textContent = t('habitStep') + ' *';
  var hcb = document.getElementById('habitCancelBtn');
  if (hcb) hcb.textContent = t('cancel');
  var hsb = document.getElementById('habitSaveBtn');
  if (hsb) hsb.textContent = t('createHabit');
  var hddt = document.getElementById('habitDeleteTitle');
  if (hddt) hddt.textContent = t('confirmDeleteHabit');
  var hdcb = document.getElementById('habitDeleteCancelBtn');
  if (hdcb) hdcb.textContent = t('cancel');
  var hdcfb = document.getElementById('habitDeleteConfirmBtn');
  if (hdcfb) hdcfb.textContent = t('deleteHabit');
  /* New settings labels */
  l('statsTitle','stats'); l('aboutTitle','about');
  l('statsBtn','showStats'); l('aboutBtn','showAbout');
  l('weekStartLabel','weekStartsMonday');
  l('boardBgLabel','boardBgLabel'); l('boardShadowsLabel','boardShadowsLabel');
  l('boardAnimationsLabel','boardAnimationsLabel');
  l('statsCloseBtn', 'close'); l('aboutCloseBtn', 'close');
  /* Week start options */
  l('weekStartMonday','monday'); l('weekStartSunday','sunday');
  /* Registros dialog */
  var rdl = document.getElementById('registroDialogTitle');
  if (rdl) rdl.textContent = _editingRegistroId ? t('registroEditTitle') : t('registroCreateTitle');
  var rnl = document.getElementById('registroNameLabel');
  if (rnl) rnl.textContent = t('registroName') + ' *';
  var rfl = document.getElementById('registroFieldsLabel');
  if (rfl) rfl.textContent = t('variableType') + 's';
  var rab = document.getElementById('registroAddFieldBtn');
  if (rab) rab.textContent = '+ ' + t('addVariable');
  var rcb = document.getElementById('registroCancelBtn');
  if (rcb) rcb.textContent = t('cancel');
  var rsb = document.getElementById('registroSaveBtn');
  if (rsb) rsb.textContent = _editingRegistroId ? t('save') : t('create');
  var rdt = document.getElementById('registroDeleteTitle');
  if (rdt) rdt.textContent = t('confirmDeleteRegistro');
  var rdcb = document.getElementById('registroDeleteCancelBtn');
  if (rdcb) rdcb.textContent = t('cancel');
  var rdcfb = document.getElementById('registroDeleteConfirmBtn');
  if (rdcfb) rdcfb.textContent = t('deleteRegistro');
  /* Diary password section */
  renderDiaryPwdSection();
  /* Settings toggle states */
  updateSettingsToggleStates();
}

var state = { notes: [], boards: [], studySets: [], trash: [], habits: [], registros: [], activeRegistroId: null, activeNoteId: null, activeBoardId: null, activeStudySetId: null, view: 'notes', theme: 'dark', lang: 'en', nextId: Date.now(), _exportCount: 0, _triggeredMilestones: [], diaryPwdHash: '', diaryRecoveryCode: '', firstVisit: true, weekStartsMonday: true, defaultBoardBg: 'cork', boardShowShadows: true, boardShowAnimations: true, lastBackupAt: null, diaryVariables: {}, registrosFilter: { from: null, to: null }, folders: [], activeFolderId: null, rootOrder: [] };
var dragState = null;
var cardDragState = null;
var connectState = null;
var postitDragState = null;
var boardPanState = null;
var diaryUnlocked = false;
var _calMonth, _calYear, _calSelectedDay;

/* Folders helpers */
var _createTab = 'note';
var pendingFolderDrop = null;
var _folderBackStack = null;
function getFolderById(id){ return state.folders.find(function(f){ return f.id===id; }); }
function isFolderUnlocked(id){ return !getFolderById(id) || !getFolderById(id).pwdHash || unlockedIds['f'+id]; }
function ensureRootOrder(){
  if(!state.rootOrder) state.rootOrder=[];
  var validNoteIds={}; state.notes.forEach(function(n){ if(!n.diary && (n.folderId==null)) validNoteIds[n.id]=true; });
  var validFolderIds={}; state.folders.forEach(function(f){ validFolderIds[f.id]=true; });
  var filtered=[]; state.rootOrder.forEach(function(e){
    if(e.type==='note' && validNoteIds[e.id]) { filtered.push(e); delete validNoteIds[e.id]; }
    else if(e.type==='folder' && validFolderIds[e.id]) { filtered.push(e); delete validFolderIds[e.id]; }
  });
  // append missing root notes in state.notes order
  state.notes.forEach(function(n){ if(!n.diary && n.folderId==null && validNoteIds[n.id]) { filtered.push({type:'note',id:n.id}); delete validNoteIds[n.id]; }});
  // append missing folders
  state.folders.forEach(function(f){ if(validFolderIds[f.id]) filtered.push({type:'folder',id:f.id}); });
  state.rootOrder = filtered;
}
function moveNoteToFolder(noteId, folderId){
  var note = state.notes.find(function(n){ return n.id===noteId; });
  if(!note || note.diary) return false;
  if(folderId!=null){
    var folder = getFolderById(folderId);
    if(!folder) return false;
    if(note.folderId===folderId) return true;
    note.folderId = folderId;
    // remove from rootOrder
    state.rootOrder = state.rootOrder.filter(function(e){ return !(e.type==='note' && e.id===noteId); });
  } else {
    if(note.folderId==null) return true;
    note.folderId = null;
    // add to rootOrder at end (or keep order by appending)
    if(!state.rootOrder.find(function(e){ return e.type==='note'&&e.id===noteId; })){
      state.rootOrder.push({type:'note', id:noteId});
    }
  }
  save();
  renderAll();
  return true;
}
function countNotesInFolder(folderId){
  var c=0; state.notes.forEach(function(n){ if(n.folderId===folderId) c++; }); return c;
}

/* Media blob URLs cache to avoid reloading */
var _mediaBlobUrls = {};

/* Cache de portadas (ref -> data URL) para no re-leer del filesystem */
var _coverUrls = {};
function getCoverUrl(note) {
  if (!note || !note.cover) return '';
  if (note.cover.indexOf('ref:') === 0) return _coverUrls[note.cover.substring(4)] || '';
  return note.cover;
}
function loadCoverUrl(note) {
  if (!note || !note.cover || note.cover.indexOf('ref:') !== 0) return Promise.resolve(getCoverUrl(note));
  var ref = note.cover.substring(4);
  if (_coverUrls[ref]) return Promise.resolve(_coverUrls[ref]);
  return ImageManager.read(ref).then(function(base64) {
    if (!base64) return '';
    var mime = ImageConverter.getMimeFromRef(ref);
    var url = 'data:' + mime + ';base64,' + base64;
    _coverUrls[ref] = url;
    return url;
  });
}

/* Container for global clipboard for board elements */
var _boardElementClipboard = null;

function resetDiaryCalendarToToday() {
  var d = new Date();
  _calMonth = d.getMonth();
  _calYear = d.getFullYear();
  _calSelectedDay = { day: d.getDate(), month: d.getMonth(), year: d.getFullYear() };
}

function dateStr(d, m, y) { return d + '-' + (m + 1) + '-' + y; }

function getDiaryNote(d, m, y) {
  var s = dateStr(d, m, y);
  return state.notes.find(function(n) { return n.diary && n.title === s; });
}
function doesDayHaveReminder(d, m, y) {
  var targetDate = new Date(y, m, d);
  var ownNote = getDiaryNote(d, m, y);
  if (ownNote && ((ownNote.events && ownNote.events.length > 0) || (ownNote.tasks && ownNote.tasks.length > 0))) {
    return true;
  }
  for (var i = 0; i < state.notes.length; i++) {
    var n = state.notes[i];
    if (!n.diary) continue;
    var all = (n.events || []).concat(n.tasks || []);
    for (var j = 0; j < all.length; j++) {
      if (all[j].repetition && all[j].repetition !== 'none' && repetitionMatchesToday(all[j], targetDate)) return true;
    }
  }
  return false;
}

function selectCalendarDay(d, m, y) {
  _calSelectedDay = { day: d, month: m, year: y };
  renderCalendarGrid();
}

function openCalendarDay(d, m, y) {
  if (!diaryUnlockFlow()) return;
  var note = getDiaryNote(d, m, y);
  if (!note) {
    note = { id: genId(), title: dateStr(d, m, y), items: [], pwdHash: '', diary: true };
    state.notes.push(note);
    save();
  }
  state.activeNoteId = note.id;
  state.view = 'diary';
  save();
  renderAll();
}

function updateCalendarHeader() {
  var months = t('months');
  var monthEl = document.querySelector('.cal-month');
  var yearEl = document.querySelector('.cal-year');
  if (monthEl) monthEl.textContent = months[_calMonth];
  if (yearEl) yearEl.textContent = String(_calYear);
}

function prevMonth() {
  if (_calYear <= 2000 && _calMonth === 0) return;
  _calMonth--;
  if (_calMonth < 0) { _calMonth = 11; _calYear--; }
  updateCalendarHeader();
  renderCalendarGrid();
}

function nextMonth() {
  if (_calYear >= 2500 && _calMonth === 11) return;
  _calMonth++;
  if (_calMonth > 11) { _calMonth = 0; _calYear++; }
  updateCalendarHeader();
  renderCalendarGrid();
}

function goToMonth(m, y) {
  if (y < 2000 || y > 2500) return;
  _calMonth = Math.max(0, Math.min(11, m));
  _calYear = y;
  renderDiaryCalendar();
}

function showMonthPicker() {
  var months = t('months');
  var html = '<div class="cal-picker-overlay" onclick="closeCalendarPicker()"><div class="cal-picker" onclick="event.stopPropagation()">';
  for (var i = 0; i < 12; i++) {
    var active = i === _calMonth ? ' active' : '';
    html += '<div class="cal-picker-item' + active + '" onclick="goToMonth(' + i + ',' + _calYear + ')">' + months[i] + '</div>';
  }
  html += '</div></div>';
  var el = document.getElementById('diaryContent');
  if (el) el.insertAdjacentHTML('beforeend', html);
}

function showYearPicker() {
  var html = '<div class="cal-picker-overlay" onclick="closeCalendarPicker()"><div class="cal-picker" onclick="event.stopPropagation()">';
  for (var y = 2000; y <= 2500; y++) {
    var active = y === _calYear ? ' active' : '';
    html += '<div class="cal-picker-item' + active + '" onclick="goToMonth(' + _calMonth + ',' + y + ')">' + y + '</div>';
  }
  html += '</div></div>';
  var el = document.getElementById('diaryContent');
  if (el) el.insertAdjacentHTML('beforeend', html);
}

function closeCalendarPicker() {
  var el = document.querySelector('.cal-picker-overlay');
  if (el) el.remove();
}

function handleCalendarSearch(val) {
  var m = val.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return;
  var d = parseInt(m[1], 10), mo = parseInt(m[2], 10) - 1, y = parseInt(m[3], 10);
  if (y < 2000 || y > 2500 || mo < 0 || mo > 11 || d < 1 || d > 31) return;
  goToMonth(mo, y);
  _calSelectedDay = { day: d, month: mo, year: y };
  renderCalendarGrid();
}

function renderCalendarHeader() {
  var months = t('months');
  var html =
    '<div class="cal-search"><input class="cal-search-input" type="text" placeholder="' + t('searchDate') + '" oninput="handleCalendarSearch(this.value)"></div>' +
    '<div class="cal-nav">' +
      '<div class="cal-month-year">' +
        '<span class="cal-month" onclick="showMonthPicker()">' + months[_calMonth] + '</span>' +
        '<span class="cal-year" onclick="showYearPicker()">' + _calYear + '</span>' +
      '</div>' +
    '</div>';
  return html;
}

function renderCalendarGrid() {
  var wrap = document.getElementById('calDaysWrap');
  if (!wrap) return;
  var dayAbbrs = t('dayAbbr');
  if (state.weekStartsMonday) dayAbbrs = dayAbbrs.slice(1).concat(dayAbbrs[0]);
  var firstDay = new Date(_calYear, _calMonth, 1).getDay();
  if (state.weekStartsMonday) firstDay = (firstDay + 6) % 7;
  var daysInMonth = new Date(_calYear, _calMonth + 1, 0).getDate();
  var daysInPrev = new Date(_calYear, _calMonth, 0).getDate();
  var today = new Date();
  var html = '<div class="cal-weekdays">';
  for (var w = 0; w < 7; w++) {
    html += '<div class="cal-weekday">' + dayAbbrs[w] + '</div>';
  }
  html += '</div><div class="cal-days">';
  var totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
  for (var i = 0; i < totalCells; i++) {
    var cellDay, cellMonth, cellYear, cls = 'cal-day';
    if (i < firstDay) {
      cellDay = daysInPrev - firstDay + i + 1;
      cellMonth = _calMonth - 1;
      cellYear = _calYear;
      if (cellMonth < 0) { cellMonth = 11; cellYear--; }
      cls += ' other-month';
    } else if (i >= firstDay + daysInMonth) {
      cellDay = i - firstDay - daysInMonth + 1;
      cellMonth = _calMonth + 1;
      cellYear = _calYear;
      if (cellMonth > 11) { cellMonth = 0; cellYear++; }
      cls += ' other-month';
    } else {
      cellDay = i - firstDay + 1;
      cellMonth = _calMonth;
      cellYear = _calYear;
    }
    if (_calSelectedDay && cellDay === _calSelectedDay.day && cellMonth === _calSelectedDay.month && cellYear === _calSelectedDay.year) {
      cls += ' selected';
    }
    if (cellDay === today.getDate() && cellMonth === today.getMonth() && cellYear === today.getFullYear()) {
      cls += ' today';
    }
    var note = getDiaryNote(cellDay, cellMonth, cellYear);
    if (note) cls += ' has-note';
    if (doesDayHaveReminder(cellDay, cellMonth, cellYear)) {
      cls += ' has-reminder';
    }
    html += '<div class="' + cls + '" data-day="' + cellDay + '" data-month="' + cellMonth + '" data-year="' + cellYear + '" onclick="selectCalendarDay(' + cellDay + ',' + cellMonth + ',' + cellYear + ')" ondblclick="openCalendarDay(' + cellDay + ',' + cellMonth + ',' + cellYear + ')">' +
      '<span class="cal-day-num">' + cellDay + '</span></div>';
  }
  html += '</div>';
  wrap.innerHTML = html;
  closeCalendarPicker();
}

function renderDiaryCalendar() {
  if (_calMonth === undefined || _calMonth === null) resetDiaryCalendarToToday();
  var container = document.getElementById('diaryContent');
  if (!container) return;
  var html = '<div class="diary-calendar">' +
    renderCalendarHeader() +
    '<div class="cal-days-wrap" id="calDaysWrap">';
  html += '</div></div>';
  container.innerHTML = html;
  renderCalendarGrid();
  setupCalendarSwipe();
}

function setupCalendarSwipe() {
  var wrap = document.getElementById('calDaysWrap');
  if (!wrap) return;
  var startX = 0, currentX = 0, moving = false;
  function onStart(e) {
    startX = e.touches[0].clientX;
    currentX = 0;
    moving = false;
    wrap.style.transition = 'none';
  }
  function onMove(e) {
    if (startX === 0) return;
    var dx = e.touches[0].clientX - startX;
    if (Math.abs(dx) > 10) {
      moving = true;
      currentX = dx;
      wrap.style.transform = 'translateX(' + dx + 'px)';
      e.preventDefault();
    }
  }
  function onEnd() {
    if (!moving) { startX = 0; return; }
    wrap.style.transition = 'transform 0.2s ease';
    if (currentX < -50) {
      wrap.style.transform = 'translateX(-100%)';
      setTimeout(function() {
        wrap.style.transition = 'none';
        wrap.style.transform = '';
        nextMonth();
      }, 200);
    } else if (currentX > 50) {
      wrap.style.transform = 'translateX(100%)';
      setTimeout(function() {
        wrap.style.transition = 'none';
        wrap.style.transform = '';
        prevMonth();
      }, 200);
    } else {
      wrap.style.transform = '';
    }
    startX = 0;
    moving = false;
  }
  wrap.addEventListener('touchstart', onStart, { passive: false });
  wrap.addEventListener('touchmove', onMove, { passive: false });
  wrap.addEventListener('touchend', onEnd);
  wrap.addEventListener('touchcancel', onEnd);
}

function renderDiaryView() {
  if (state.activeNoteId) {
    renderNoteContent();
  } else {
    if (!_calMonth && _calMonth !== 0) resetDiaryCalendarToToday();
    renderDiaryCalendar();
  }
}

var POSTIT_COLORS = ['yellow', 'green', 'blue', 'pink', 'orange'];
var COLOR_VALS = { yellow: '#fff8b0', green: '#b5e8b5', blue: '#b5d4e8', pink: '#f8c8d8', orange: '#f8d4a8' };
var boardZoom = 1;
var pinchState = null;

/* Crea un reproductor de audio dentro de un contenedor.
   ref: ruta del archivo multimedia (ej: 'audios/uuid.mp3')
   container: elemento DOM donde insertar el reproductor
   options: { autoplay, onplay, onpause, onend }
   Devuelve el elemento del reproductor */
function createAudioPlayer(ref, container, options) {
  options = options || {};
  var wrapper = document.createElement('div');
  wrapper.className = 'audio-player';

  var controlsRow = document.createElement('div');
  controlsRow.className = 'ap-controls';

  var playBtn = document.createElement('button');
  playBtn.className = 'ap-play';
  playBtn.innerHTML = '&#x25B6;';
  playBtn.title = 'Play';

  var restartBtn = document.createElement('button');
  restartBtn.className = 'ap-restart';
  restartBtn.innerHTML = '&#x21BA;';
  restartBtn.title = 'Restart';

  controlsRow.appendChild(playBtn);
  controlsRow.appendChild(restartBtn);

  var timeRow = document.createElement('div');
  timeRow.className = 'ap-time-row';

  var curTime = document.createElement('span');
  curTime.className = 'ap-time';
  curTime.textContent = '00:00';

  var totalTime = document.createElement('span');
  totalTime.className = 'ap-time';
  totalTime.textContent = '00:00';

  timeRow.appendChild(curTime);
  timeRow.appendChild(totalTime);

  wrapper.appendChild(controlsRow);
  wrapper.appendChild(timeRow);
  container.appendChild(wrapper);

  var audio = document.createElement('audio');
  audio.preload = 'metadata';

  var loaded = false;
  var _playRequested = false;
  var url = _mediaBlobUrls[ref];

  function loadAudio() {
    if (loaded) return;
    loaded = true;
    if (!url) {
      var cachedUrl = _mediaBlobUrls[ref];
      if (cachedUrl) {
        url = cachedUrl;
        audio.src = url;
        return;
      }
      ImageManager.read(ref).then(function(base64) {
        if (!base64) {
          playBtn.innerHTML = '&#x2716;';
          playBtn.title = 'Error loading audio';
          return;
        }
        var mime = ImageConverter.getMimeFromRef(ref);
        var blob = _base64ToBlob(base64, mime);
        url = URL.createObjectURL(blob);
        _mediaBlobUrls[ref] = url;
        audio.src = url;
        if (options.autoplay) audio.play();
      });
    } else {
      audio.src = url;
      if (options.autoplay) audio.play();
    }
  }

  function formatTime(sec) {
    if (isNaN(sec) || sec === Infinity || sec < 0) return '00:00';
    var m = Math.floor(sec / 60);
    var s = Math.floor(sec % 60);
    return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  }

  function updateUI() {
    curTime.textContent = formatTime(audio.currentTime);
    if (audio.duration && isFinite(audio.duration)) {
      totalTime.textContent = formatTime(audio.duration);
    }
  }

  audio.addEventListener('loadedmetadata', function() {
    totalTime.textContent = formatTime(audio.duration);
  });

  audio.addEventListener('timeupdate', function() {
    updateUI();
  });

  audio.addEventListener('ended', function() {
    audio.currentTime = 0;
    _playRequested = false;
    playBtn.innerHTML = '&#x25B6;';
    curTime.textContent = '00:00';
    if (options.onend) options.onend();
  });

  playBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    loadAudio();
    if (audio.paused && !_playRequested) {
      _playRequested = true;
      audio.play().then(function() { _playRequested = false; }).catch(function() { _playRequested = false; });
      playBtn.innerHTML = '&#x23F8;';
    } else if (!audio.paused) {
      _playRequested = false;
      audio.pause();
      playBtn.innerHTML = '&#x25B6;';
    }
  });

  restartBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    loadAudio();
    _playRequested = false;
    audio.currentTime = 0;
    curTime.textContent = '00:00';
    playBtn.innerHTML = '&#x25B6;';
  });

  /* Limpiar al eliminar el wrapper */
  wrapper._cleanup = function() {
    audio.pause();
    audio.src = '';
  };

  return wrapper;
}

/* Convierte base64 a Blob */
function _base64ToBlob(base64, mime) {
  var binary = atob(base64);
  var len = binary.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}

var _quotaWarned = false;
function save() {
  try {
    localStorage.setItem('appnotas', JSON.stringify(state));
  } catch(e) {
    console.error('Error guardando datos:', e);
    if (!_quotaWarned) {
      _quotaWarned = true;
      try {
        alert('No se pudo guardar: el almacenamiento local está lleno. Elimina contenido multimedia o notas para liberar espacio.');
      } catch(e2) {}
    }
  }
}
function load() {
  try {
    var d = localStorage.getItem('appnotas');
    if (d) { state = JSON.parse(d);
      if (!state.nextId) state.nextId = Date.now();
      if (!state.notes) state.notes = [];
      if (!state.boards) state.boards = [];
      if (!state.studySets) state.studySets = [];
      if (!state.trash) state.trash = [];
      if (!state.view) state.view = 'notes';
      if (!state.theme) state.theme = 'dark';
      if (!state.lang) state.lang = 'en';
      if (!state._exportCount) state._exportCount = 0;
      if (!state._triggeredMilestones) state._triggeredMilestones = [];
    if (!state.diaryPwdHash) state.diaryPwdHash = '';
    if (!state.diaryRecoveryCode) state.diaryRecoveryCode = '';
    if (state.firstVisit === undefined) state.firstVisit = false;
    if (state.weekStartsMonday === undefined) state.weekStartsMonday = true;
    if (!state.defaultBoardBg) state.defaultBoardBg = 'cork';
    if (state.boardShowShadows === undefined) state.boardShowShadows = true;
    if (state.boardShowAnimations === undefined) state.boardShowAnimations = true;
    if (state.lastBackupAt === undefined) state.lastBackupAt = null;
    if (!state.habits) state.habits = [];
    if (!state.registros) state.registros = [];
    if (state.activeRegistroId === undefined) state.activeRegistroId = null;
    if (!state.registrosFilter || typeof state.registrosFilter !== 'object') state.registrosFilter = { from: null, to: null };
    if (!state.diaryVariables || typeof state.diaryVariables !== 'object' || Array.isArray(state.diaryVariables)) state.diaryVariables = {};
    // Migrar registros: asegurar estructura
    state.registros.forEach(function(r){
      if (!r.fields) r.fields = [];
      if (!r.entries || typeof r.entries !== 'object' || Array.isArray(r.entries)) r.entries = {};
      if (!r.name) r.name = 'Registro';
      if (!r.id) r.id = genId();
      if (!r.createdAt) r.createdAt = Date.now();
      // Normalizar fields
      var seenNames = {};
      var cleanFields = [];
      r.fields.forEach(function(f){
        if (!f || !f.name) return;
        if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(f.name)) return;
        if (seenNames[f.name]) return;
        if (['int','float','bool','texto'].indexOf(f.type)===-1) f.type='texto';
        if (!f.id) f.id = genId();
        seenNames[f.name]=true;
        cleanFields.push(f);
      });
      r.fields = cleanFields;
      // Normalizar entries: cada fecha -> objeto field->value tipado
      var newEntries = {};
      for (var d in r.entries) if (Object.prototype.hasOwnProperty.call(r.entries,d)) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) continue;
        var row = r.entries[d];
        if (!row || typeof row!=='object') continue;
        var cleanRow = {};
        for (var fk in row) if (Object.prototype.hasOwnProperty.call(row,fk)) {
          // solo fields existentes
          var field = r.fields.find(function(ff){ return ff.name===fk; });
          if (!field) continue;
          var v = row[fk];
          // validar tipo
          if (field.type==='int' && typeof v==='string' && /^-?\d+$/.test(v.trim())) v=parseInt(v,10);
          if (field.type==='float' && typeof v==='string' && /^-?\d+(\.\d+)?$/.test(v.trim())) v=parseFloat(v);
          if (field.type==='bool' && typeof v==='string') {
            var low=v.toLowerCase().trim();
            if (low==='true'||low==='1') v=true; else if (low==='false'||low==='0') v=false;
          }
          cleanRow[fk]=v;
        }
        if (Object.keys(cleanRow).length>0) newEntries[d]=cleanRow;
      }
      r.entries=newEntries;
    });
    // Unicidad global de variables entre registros
    (function(){
      var globalSeen={};
      state.registros.forEach(function(r){
        var toKeep=[];
        r.fields.forEach(function(f){
          if (globalSeen[f.name]) return; // duplicado global -> eliminar
          globalSeen[f.name]=true;
          toKeep.push(f);
        });
        // Si se eliminaron fields por duplicado, también limpiar entries
        if (toKeep.length!==r.fields.length) {
          var keepNames={}; toKeep.forEach(function(f){ keepNames[f.name]=true; });
          for (var d in r.entries) if(Object.prototype.hasOwnProperty.call(r.entries,d)){
            for (var fk in r.entries[d]) if(!keepNames[fk]) delete r.entries[d][fk];
            if(Object.keys(r.entries[d]).length===0) delete r.entries[d];
          }
        }
        r.fields=toKeep;
      });
    })();
    // Migrar diaryVariables: asegurar arrays ordenados y valores saneados
    for (var _dvk in state.diaryVariables) if (Object.prototype.hasOwnProperty.call(state.diaryVariables, _dvk)) {
      var _arr = state.diaryVariables[_dvk];
      if (!Array.isArray(_arr)) { state.diaryVariables[_dvk] = []; continue; }
      // Filtrar entradas malformadas y normalizar
      var _clean = [];
      var _seen = {};
      for (var _vi=0; _vi<_arr.length; _vi++) {
        var _e = _arr[_vi];
        if (!_e || ! _e.date) continue;
        if (_seen[_e.date]) continue;
        // Normalizar value: si es numeric string, convertir
        if (typeof _e.value === 'string' && /^-?\d+(\.\d+)?$/.test(_e.value.trim())) _e.value = Number(_e.value.trim());
        if (_e.raw === undefined) _e.raw = String(_e.value);
        _clean.push(_e);
        _seen[_e.date]=true;
      }
      _clean.sort(function(a,b){ return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });
      state.diaryVariables[_dvk] = _clean;
    }
    delete state.persistentNotifActive;
    // Migración carpetas
    if(!state.folders) state.folders=[];
    if(state.activeFolderId===undefined) state.activeFolderId=null;
    if(!state.rootOrder || !Array.isArray(state.rootOrder)) state.rootOrder=[];
    // Normalizar notas: folderId
    state.notes.forEach(function(n){
      if(n.folderId===undefined) n.folderId=null;
      if(typeof n.folderId==='string') n.folderId = Number(n.folderId)||null;
      if(n.folderId!=null && typeof n.folderId!=='number') n.folderId=null;
    });
    // Normalizar folders
    state.folders.forEach(function(f){
      if(typeof f.id==='string') f.id=Number(f.id);
      if(!f.name) f.name='Carpeta';
      f.name=String(f.name).trim()||'Carpeta';
      if(f.pwdHash===undefined) f.pwdHash='';
      if(!f.createdAt) f.createdAt=Date.now();
    });
    // Validar folderId huérfano
    (function(){
      var validFolderIds={}; state.folders.forEach(function(f){ validFolderIds[f.id]=true; });
      state.notes.forEach(function(n){ if(n.folderId!=null && !validFolderIds[n.folderId]) n.folderId=null; });
      // Validar y regenerar rootOrder si es necesario
      var validNoteIds={}; state.notes.forEach(function(n){ if(!n.diary && n.folderId==null) validNoteIds[n.id]=true; });
      var validFolderSet={}; state.folders.forEach(function(f){ validFolderSet[f.id]=true; });
      var filtered=[]; var seenRO={};
      state.rootOrder.forEach(function(e){
        if(!e || !e.type || e.id==null) return;
        var key=e.type+':'+e.id; if(seenRO[key]) return; seenRO[key]=true;
        if(e.type==='note' && validNoteIds[e.id]){ filtered.push(e); delete validNoteIds[e.id]; }
        else if(e.type==='folder' && validFolderSet[e.id]){ filtered.push(e); delete validFolderSet[e.id]; }
      });
      // Append missing en orden original
      state.notes.forEach(function(n){ if(!n.diary && n.folderId==null && validNoteIds[n.id]){ filtered.push({type:'note',id:n.id}); delete validNoteIds[n.id]; }});
      state.folders.forEach(function(f){ if(validFolderSet[f.id]) filtered.push({type:'folder',id:f.id}); });
      state.rootOrder = filtered;
      if(state.activeFolderId!=null && !validFolderSet[state.activeFolderId] && !state.folders.find(function(f){return f.id===state.activeFolderId;})) state.activeFolderId=null;
    })();
    if (state.boards) state.boards.forEach(function(b) { if (!b.elements) b.elements = []; });
  }
    if (state.notes) state.notes.forEach(function(n) {
      if (!n.events) n.events = [];
      if (!n.tasks) n.tasks = [];
      // Eliminar recordatorios diarios antiguos (repetition daily)
      if (n.events) n.events = n.events.filter(function(e){ return e.repetition !== 'daily'; });
      if (n.tasks) n.tasks = n.tasks.filter(function(t){ return t.repetition !== 'daily'; });
    });
    if (state.habits) state.habits.forEach(function(h){
      if (h.current == null) h.current = 0;
      if (!h.status) h.status = 'pending';
      if (h.streak == null) h.streak = 0;
      if (!h.lastProcessedDate) h.lastProcessedDate = getDateStr(new Date());
      if (!h.history) h.history = [];
      if (h.total != null) h.total = Number(h.total);
      if (h.step != null) h.step = Number(h.step);
    });
    // Migración: si diaryVariables está vacío pero hay asignaciones en notas del Diario ya existentes, reconstruir historial
    if (state.diaryVariables && Object.keys(state.diaryVariables).length===0 && state.notes) {
      var _didMigrateVars = false;
      state.notes.forEach(function(n){
        if (!n.diary || !n.items) return;
        n.items.forEach(function(it){
          if (!it.text || it.text.indexOf('@')===-1) return;
          if (processDiaryVariableAssignments(n, it.text)) _didMigrateVars = true;
        });
      });
      if (_didMigrateVars) {
        try { localStorage.setItem('appnotas', JSON.stringify(state)); } catch(e){}
      }
    }
    cleanupTrash();
  } catch(e) { console.warn('Error loading', e); }
}

function genId() { return state.nextId++; }
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

function applyBoardZoom() {
  var wrap = document.querySelector('.board-canvas-wrap');
  if (!wrap) return;
  var layer = wrap.querySelector('.board-zoom-layer');
  var inner = wrap.querySelector('.board-canvas-inner');
  if (!layer || !inner) return;
  var vz = Math.max(0.2, Math.min(3, boardZoom));
  boardZoom = vz;
  var baseW = parseInt(inner.style.width) || parseInt(layer.style.width) || 3000;
  var baseH = parseInt(inner.style.height) || parseInt(layer.style.height) || 3000;
  var layerW = Math.max(baseW * vz, wrap.clientWidth);
  var layerH = Math.max(baseH * vz, wrap.clientHeight);
  layer.style.width = layerW + 'px';
  layer.style.height = layerH + 'px';
  inner.style.transform = 'scale(' + vz + ')';
}

function resetBoardZoom() {
  boardZoom = 1;
  applyBoardZoom();
  var wrap = document.querySelector('.board-canvas-wrap');
  if (wrap) wrap.scrollLeft = wrap.scrollTop = 0;
  var btn = document.querySelector('.board-toolbar .btn[onclick*="resetBoardZoom"]');
  if (btn) btn.textContent = '100%';
}

// Ctrl+wheel zoom (PC)
document.addEventListener('wheel', function(e) {
  if (!e.ctrlKey) return;
  var wrap = e.target.closest('.board-canvas-wrap');
  if (!wrap) return;
  e.preventDefault();
  var layer = wrap.querySelector('.board-zoom-layer');
  var inner = wrap.querySelector('.board-canvas-inner');
  if (!layer || !inner) return;
  var oldZoom = boardZoom;
  var delta = -e.deltaY * 0.001;
  boardZoom = Math.max(0.2, Math.min(3, boardZoom * (1 + delta)));
  applyBoardZoom();
  // Zoom toward cursor
  var rect = wrap.getBoundingClientRect();
  var cx = e.clientX - rect.left;
  var cy = e.clientY - rect.top;
  wrap.scrollLeft = (cx + wrap.scrollLeft) * boardZoom / oldZoom - cx;
  wrap.scrollTop = (cy + wrap.scrollTop) * boardZoom / oldZoom - cy;
  var btn = document.querySelector('.board-toolbar .btn[onclick*="resetBoardZoom"]');
  if (btn) btn.textContent = Math.round(boardZoom * 100) + '%';
}, { passive: false });

// Pinch-to-zoom (Android)
document.addEventListener('touchstart', function(e) {
  if (e.touches.length !== 2) return;
  var wrap = e.target.closest('.board-canvas-wrap');
  if (!wrap) return;
  postitDragState = null;
  boardPanState = null;
  var t = e.touches;
  pinchState = {
    wrap: wrap,
    dist: Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY),
    zoom: boardZoom,
    cx: (t[0].clientX + t[1].clientX) / 2,
    cy: (t[0].clientY + t[1].clientY) / 2
  };
}, { passive: true });

document.addEventListener('touchmove', function(e) {
  if (!pinchState || e.touches.length !== 2) return;
  e.preventDefault();
  var t = e.touches;
  var newDist = Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
  var ratio = newDist / pinchState.dist;
  var oldZoom = boardZoom;
  boardZoom = Math.max(0.2, Math.min(3, pinchState.zoom * ratio));
  applyBoardZoom();
  // Zoom toward midpoint
  var wrap = pinchState.wrap;
  var rect = wrap.getBoundingClientRect();
  var mx = pinchState.cx - rect.left;
  var my = pinchState.cy - rect.top;
  wrap.scrollLeft = (mx + wrap.scrollLeft) * boardZoom / oldZoom - mx;
  wrap.scrollTop = (my + wrap.scrollTop) * boardZoom / oldZoom - my;
  var btn = document.querySelector('.board-toolbar .btn[onclick*="resetBoardZoom"]');
  if (btn) btn.textContent = Math.round(boardZoom * 100) + '%';
}, { passive: false });

document.addEventListener('touchend', function(e) {
  if (!pinchState) return;
  if (e.touches.length < 2) pinchState = null;
});


function showDialog(id) { hideContextMenu(); document.getElementById(id).classList.remove('hidden'); }
function closeDialog(id) {
  document.getElementById(id).classList.add('hidden');
  if (id === 'unlockDialog') { pendingDelete = null; pendingUnlock = null; resetUnlockDialog(); }
}
function welcomeSetLang(code) {
  state.lang = code;
  save();
  applyLang();
  applyTheme();
  document.documentElement.lang = code;
}
function welcomeDone() {
  state.firstVisit = false;
  save();
  closeDialog('welcomeDialog');
}
function setStatus(msg) { if (msg) console.log('[AppNotas] ' + msg); }
function showToast(msg) {
  var el = document.createElement('div');
  el.textContent = msg;
  el.style.cssText = 'position:fixed;bottom:100px;left:16px;right:16px;background:rgba(0,0,0,0.85);color:#fff;padding:14px 20px;border-radius:10px;text-align:center;z-index:9999;font-size:15px';
  document.body.appendChild(el);
  setTimeout(function() { el.remove(); }, 4000);
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  applyTheme();
  save();
}
function applyTheme() {
  document.body.classList.toggle('light', state.theme === 'light');
  var logo = document.getElementById('headerLogo');
  if (logo) {
    logo.src = state.theme === 'light' ? 'Logotipo1.png' : 'Logotipo2.png';
  }
  var sidebarLogo = document.getElementById('sidebarLogo');
  if (sidebarLogo) {
    sidebarLogo.src = state.theme === 'light' ? 'Logotipo1.png' : 'Logotipo2.png';
  }
  applyLang();
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}
/* Elimina caracteres inválidos para nombres de archivo */
function sanitizeFilename(name) {
  return (name || 'nota').replace(/[<>:"\/\\|?*\x00-\x1f]/g, '').trim() || 'nota';
}

function parseNoteLinks(text) {
  if (!text) return '';
  text = text.replace(/\[\(([^\]]+)\)\]/g, '<a class="note-link" data-target="$1">$1</a>');
  text = text.replace(/\[\{([^\]]+)\}\]/g, '<a class="ext-link" href="$1" target="_blank" rel="noopener">$1</a>');
  return text;
}
function unparseNoteLinks(html) {
  html = html.replace(/<a\s+class="note-link"[^>]*data-target="([^"]*)"[^>]*>[\s\S]*?<\/a>/g, '[($1)]');
  html = html.replace(/<a\s+class="ext-link"[^>]*href="([^"]*)"[^>]*>[\s\S]*?<\/a>/g, '[{$1}]');
  return html;
}

/* === Diario - Variables históricas (@var = valor / @var) === */
var _diaryVarNameRegex = '[a-zA-Z_][a-zA-Z0-9_]*';
var _diaryVarAssignmentRegex = new RegExp('@(' + _diaryVarNameRegex + ')\\s*=\\s*(?:"([^"]*)"|\'([^\']*)\'|([^\\s@]+))', 'g');
var _diaryVarQueryRegex = new RegExp('@(' + _diaryVarNameRegex + ')\\b(?!\\s*=)(?!/)', 'g');

function isValidVarName(name) {
  return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name);
}
function diaryDateISO(note) {
  if (note && note.diary && note.title) {
    var p = note.title.split('-').map(function(x){ return parseInt(x,10); });
    if (p.length===3 && !isNaN(p[0]) && !isNaN(p[1]) && !isNaN(p[2])) {
      var d = new Date(p[2], p[1]-1, p[0]);
      if (!isNaN(d.getTime())) return getDateStr(d);
    }
  }
  return getDateStr(new Date());
}
function parseVariableValue(rawQuotedDouble, rawQuotedSingle, rawUnquoted) {
  var raw = rawQuotedDouble !== undefined && rawQuotedDouble !== null ? rawQuotedDouble : (rawQuotedSingle !== undefined && rawQuotedSingle !== null ? rawQuotedSingle : rawUnquoted);
  if (raw === undefined || raw === null) raw = '';
  // raw ya sin comillas; para valores con comillas vacías es ""
  var trimmed = raw.trim();
  // Si era con comillas, respeta espacios internos, no castear vacio a 0
  var isQuoted = rawQuotedDouble !== undefined || rawQuotedSingle !== undefined;
  if (!isQuoted && trimmed === '') return null;
  // Intentar numero solo si no fue quoted? Pero "37" entre comillas debe quedar string según spec? Spec ejemplo libro_actual = "Cumbres Borrascosas" string. Para numeros entre comillas, dejar string? Decidimos: si quoted, siempre string.
  if (!isQuoted && /^-?\d+(\.\d+)?$/.test(trimmed)) {
    return { value: Number(trimmed), raw: trimmed };
  }
  return { value: trimmed, raw: trimmed };
}
function ensureDiaryVariables() {
  if (!state.diaryVariables || typeof state.diaryVariables !== 'object' || Array.isArray(state.diaryVariables)) state.diaryVariables = {};
}
function processDiaryVariableAssignments(note, textHtml) {
  if (!note || !note.diary) return false;
  ensureDiaryVariables();
  // Extraer texto plano sin tags para detectar asignaciones
  var plain = textHtml || '';
  // Quitar tags HTML pero preservar espacios y saltos
  plain = plain.replace(/<br\s*\/?>/gi, '\n');
  plain = plain.replace(/<[^>]*>/g, ' ');
  // Decodificar entidades básicas
  plain = plain.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#039;/g,"'").replace(/&nbsp;/g,' ');
  var dateISO = diaryDateISO(note);
  var changed = false;
  var match;
  _diaryVarAssignmentRegex.lastIndex = 0;
  while ((match = _diaryVarAssignmentRegex.exec(plain)) !== null) {
    var varName = match[1];
    if (!isValidVarName(varName)) continue;
    // match[2]=double quoted, match[3]=single quoted, match[4]=unquoted
    var hasDouble = match[2] !== undefined;
    var hasSingle = match[3] !== undefined;
    var parsed = null;
    if (hasDouble) parsed = parseVariableValue(match[2], undefined, undefined);
    else if (hasSingle) parsed = parseVariableValue(undefined, match[3], undefined);
    else parsed = parseVariableValue(undefined, undefined, match[4]);
    if (!parsed) continue;
    // Validación: valor vacío con comillas "" es valido como string vacío? Permitir pero si es "" y no quoted vacio? Para no quoted ya retornó null arriba. Para quoted vacío, trimmed=='' pero isQuoted true, parseVariableValue retorna {value:'', raw:''} -> permitir string vacío? Mejor permitir.
    // Si valor es string vacío y es asignación con comillas, igualmente almacenar (puede ser intencional). Si no, ignorar.
    if (parsed.raw === '' && !hasDouble && !hasSingle) continue;
    var arr = state.diaryVariables[varName];
    if (!arr) { arr = state.diaryVariables[varName] = []; }
    var existing = null;
    for (var i=0;i<arr.length;i++) if (arr[i].date === dateISO) { existing = arr[i]; break; }
    if (existing) {
      if (existing.value !== parsed.value || existing.raw !== parsed.raw) {
        existing.value = parsed.value;
        existing.raw = parsed.raw;
        changed = true;
      }
    } else {
      arr.push({ date: dateISO, value: parsed.value, raw: parsed.raw });
      changed = true;
    }
  }
  if (changed) {
    // Ordenar por fecha ascendente
    for (var k in state.diaryVariables) if (Object.prototype.hasOwnProperty.call(state.diaryVariables,k)) {
      state.diaryVariables[k].sort(function(a,b){ return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });
    }
  }
  return changed;
}
function formatDisplayDate(dateISO) {
  // dateISO YYYY-MM-DD -> DD/MM/YYYY
  if (!dateISO) return '';
  var p = dateISO.split('-');
  if (p.length!==3) return dateISO;
  return p[2].padStart(2,'0') + '/' + p[1].padStart(2,'0') + '/' + p[0];
}
function buildVariableHistoryHtml(varName) {
  ensureDiaryVariables();
  var arr = state.diaryVariables[varName];
  if (!arr || arr.length===0) {
    return '<span class="diary-var diary-var-unknown" title="Variable inexistente">@' + escapeHtml(varName) + ' <span class="var-unknown-label">(sin datos)</span></span>';
  }
  var html = '<span class="diary-var" data-var="' + escapeHtml(varName) + '">';
  html += '<span class="diary-var-name">@' + escapeHtml(varName) + '</span>';
  html += '<span class="diary-var-history">';
  for (var i=0;i<arr.length;i++) {
    var e = arr[i];
    var dispVal = (typeof e.value === 'string' && e.value.indexOf('<')!==-1) ? escapeHtml(e.value) : escapeHtml(String(e.value));
    // Si raw tenía comillas originalmente, ya está sin ellas en value; mostrar value
    html += '<span class="var-entry"><span class="var-date">' + escapeHtml(formatDisplayDate(e.date)) + '</span> \u2192 <span class="var-value">' + dispVal + '</span></span>';
    if (i < arr.length-1) html += '<br>';
  }
  html += '</span></span>';
  return html;
}
function parseDiaryVariablesForRender(text) {
  if (!text) return '';
  // No procesar si no hay @
  if (text.indexOf('@') === -1) return text;
  // Asegurar estructura
  ensureDiaryVariables();
  // Reemplazar consultas (@var sin =) por historial. Asignaciones (@var = val) se dejan como texto.
  return text.replace(_diaryVarQueryRegex, function(match, varName) {
    // Si es parte de asignación, la regex con negative lookahead ya lo excluye, pero por seguridad verificar que no hay = después
    // Construir historial
    return buildVariableHistoryHtml(varName);
  });
}
function hasDiaryVariableAssignment(textHtml) {
  if (!textHtml || textHtml.indexOf('@')===-1 || textHtml.indexOf('=')===-1) return false;
  var plain = textHtml.replace(/<br\s*\/?>/gi,'\n').replace(/<[^>]*>/g,' ');
  plain = plain.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#039;/g,"'").replace(/&nbsp;/g,' ');
  _diaryVarAssignmentRegex.lastIndex = 0;
  return _diaryVarAssignmentRegex.test(plain);
}

/* === Registros (struct) === */
var _registroNameRegex = '[a-zA-Z_][a-zA-Z0-9_]*';
var _registroAssignmentRegex = new RegExp('@(' + _registroNameRegex + ')\\/(' + _registroNameRegex + ')\\s*=\\s*(?:"([^"]*)"|\'([^\']*)\'|([^\\s@\\[]+))', 'g');
var _registroQueryRegex = new RegExp('@(' + _registroNameRegex + ')(?:\\/(' + _registroNameRegex + '))?(?:\\[([^\\]]*)\\])?(?!\\s*=)', 'g');
var _registroValidTypes = ['int','float','bool','texto'];

function ensureRegistros() {
  if (!state.registros || !Array.isArray(state.registros)) state.registros = [];
  if (state.activeRegistroId === undefined) state.activeRegistroId = null;
  if (!state.registrosFilter || typeof state.registrosFilter !== 'object') state.registrosFilter = { from: null, to: null };
}
function getRegistroById(id) {
  ensureRegistros();
  return state.registros.find(function(r){ return r.id===id; });
}
function getRegistroByName(name) {
  ensureRegistros();
  return state.registros.find(function(r){ return r.name===name; });
}
function isValidRegistroName(name) {
  return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name);
}
function isRegistroNameUnique(name, excludeId) {
  ensureRegistros();
  return !state.registros.some(function(r){ return r.name===name && r.id!==excludeId; });
}
function isFieldNameUniqueGlobal(fieldName, exclude) {
  ensureRegistros();
  // exclude = { registroId, fieldId } para edición
  for (var i=0;i<state.registros.length;i++) {
    var r=state.registros[i];
    for (var j=0;j<r.fields.length;j++) {
      var f=r.fields[j];
      if (f.name===fieldName) {
        if (exclude && exclude.registroId===r.id && exclude.fieldId===f.id) continue;
        return false;
      }
    }
  }
  // también contra diaryVariables legacy para evitar confusión
  if (state.diaryVariables && state.diaryVariables[fieldName]) return false;
  return true;
}
function validateValueForType(raw, type, isQuoted) {
  var trimmed = (raw||'').trim();
  if (type==='texto') {
    // texto: si no está entre comillas y contiene espacios, ya habría sido cortado; pero permitimos cualquier string
    // Si isQuoted es true, trimmed puede ser "" (vacío) permitido
    // Si no quoted, trimmed no debe estar vacío
    if (!isQuoted && trimmed==='') return null;
    return trimmed;
  }
  if (type==='int') {
    if (!/^-?\d+$/.test(trimmed)) return null;
    var n=parseInt(trimmed,10);
    if (isNaN(n)) return null;
    return n;
  }
  if (type==='float') {
    if (!/^-?\d+(\.\d+)?$/.test(trimmed)) return null;
    var f=parseFloat(trimmed);
    if (isNaN(f)) return null;
    return f;
  }
  if (type==='bool') {
    var low=trimmed.toLowerCase();
    if (low==='true' || low==='1') return true;
    if (low==='false' || low==='0') return false;
    return null;
  }
  return null;
}
function registroDateISO(note) {
  return diaryDateISO(note);
}
function isValidISODate(s) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  var p=s.split('-').map(function(x){ return parseInt(x,10); });
  var y=p[0], m=p[1], d=p[2];
  if (m<1||m>12||d<1||d>31) return false;
  var date=new Date(y,m-1,d);
  return date.getFullYear()===y && date.getMonth()===m-1 && date.getDate()===d;
}
function parseDateFilter(filterStr) {
  if (!filterStr) return null;
  filterStr=filterStr.trim();
  if (filterStr==='') return null;
  if (filterStr.indexOf(':')!==-1) {
    var parts=filterStr.split(':');
    if (parts.length!==2) return { invalid:true };
    var from=parts[0].trim(), to=parts[1].trim();
    if (!isValidISODate(from) || !isValidISODate(to)) return { invalid:true };
    if (from>to) return { invalid:true };
    return { from:from, to:to };
  } else {
    if (!isValidISODate(filterStr)) return { invalid:true };
    return { from:filterStr, to:filterStr };
  }
}
function isDateInFilter(dateISO, filter) {
  if (!filter || (!filter.from && !filter.to)) return true;
  if (filter.invalid) return false;
  return dateISO >= filter.from && dateISO <= filter.to;
}
function processRegistroAssignments(note, textHtml) {
  if (!note || !note.diary) return false;
  ensureRegistros();
  if (state.registros.length===0) return false;
  var plain=textHtml||'';
  plain=plain.replace(/<br\s*\/?>/gi,'\n');
  plain=plain.replace(/<[^>]*>/g,' ');
  plain=plain.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#039;/g,"'").replace(/&nbsp;/g,' ');
  var dateISO=registroDateISO(note);
  var changed=false;
  var match;
  _registroAssignmentRegex.lastIndex=0;
  while ((match=_registroAssignmentRegex.exec(plain))!==null) {
    var regName=match[1], fieldName=match[2];
    var hasDouble=match[3]!==undefined, hasSingle=match[4]!==undefined;
    var rawVal = hasDouble ? match[3] : (hasSingle ? match[4] : match[5]);
    var isQuoted = hasDouble || hasSingle;
    var registro=getRegistroByName(regName);
    if (!registro) continue;
    var field=registro.fields.find(function(f){ return f.name===fieldName; });
    if (!field) continue;
    // Validar tipo: si texto con espacios sin comillas, rawVal solo tiene primera palabra -> pero según spec debe usar comillas, así que si type texto y plain contenía espacios sin comillas, igualmente rawVal sería solo primera palabra; lo almacenamos como tal (no intentamos recuperar resto)
    var typed=validateValueForType(rawVal, field.type, isQuoted);
    if (typed===null && !(field.type==='texto' && isQuoted && rawVal==='')) continue; // texto vacío con comillas permitido
    if (typed===null) continue;
    if (!registro.entries) registro.entries={};
    if (!registro.entries[dateISO]) registro.entries[dateISO]={};
    // Solo un valor por día por campo, pero entries es por fecha con todos los fields
    if (registro.entries[dateISO][fieldName]!==typed) {
      registro.entries[dateISO][fieldName]=typed;
      changed=true;
    }
  }
  return changed;
}
function formatRegistroValue(v, type) {
  if (v===undefined || v===null) return '';
  if (type==='bool') return v ? 'true' : 'false';
  return String(v);
}
function buildRegistroFieldHistoryHtml(registro, fieldName, filter) {
  if (!registro) return '<span class="diary-var diary-var-unknown" title="Registro inexistente">@' + escapeHtml(fieldName) + ' (registro no encontrado)</span>';
  var field=registro.fields.find(function(f){ return f.name===fieldName; });
  if (!field) return '<span class="diary-var diary-var-unknown" title="Variable inexistente">@' + escapeHtml(registro.name+'/'+fieldName) + ' <span class="var-unknown-label">(sin datos)</span></span>';
  if (filter && filter.invalid) return '<span class="diary-var diary-var-unknown" title="Filtro inválido">@' + escapeHtml(registro.name+'/'+fieldName) + '[' + escapeHtml(filter.raw||'') + '] <span class="var-unknown-label">(filtro inválido)</span></span>';
  var dates=Object.keys(registro.entries||{}).sort();
  var filtered=dates.filter(function(d){ return isDateInFilter(d, filter); });
  if (filtered.length===0) {
    // Si no hay datos en rango, mostrar vacío
    return '<span class="diary-var" data-var="' + escapeHtml(registro.name+'/'+fieldName) + '"><span class="diary-var-name">@' + escapeHtml(registro.name+'/'+fieldName) + '</span><span class="diary-var-history"><span class="var-unknown-label">(sin datos en rango)</span></span></span>';
  }
  var html='<span class="diary-var" data-var="' + escapeHtml(registro.name+'/'+fieldName) + '"><span class="diary-var-name">@' + escapeHtml(registro.name+'/'+fieldName) + '</span><span class="diary-var-history">';
  for (var i=0;i<filtered.length;i++) {
    var d=filtered[i];
    var row=registro.entries[d];
    var val=row[fieldName];
    if (val===undefined) continue;
    html+='<span class="var-entry"><span class="var-date">' + escapeHtml(formatDisplayDate(d)) + '</span> \u2192 <span class="var-value">' + escapeHtml(formatRegistroValue(val, field.type)) + '</span></span>';
    if (i<filtered.length-1) html+='<br>';
  }
  html+='</span></span>';
  return html;
}
function buildRegistroFullHistoryHtml(registro, filter) {
  if (!registro) return '<span class="diary-var diary-var-unknown" title="Registro inexistente">@? <span class="var-unknown-label">(inexistente)</span></span>';
  if (filter && filter.invalid) return '<span class="diary-var diary-var-unknown" title="Filtro inválido">@' + escapeHtml(registro.name) + '[' + escapeHtml(filter.raw||'') + '] <span class="var-unknown-label">(filtro inválido)</span></span>';
  var dates=Object.keys(registro.entries||{}).sort();
  var filtered=dates.filter(function(d){ return isDateInFilter(d, filter); });
  if (filtered.length===0) {
    return '<span class="diary-var" data-var="' + escapeHtml(registro.name) + '"><span class="diary-var-name">@' + escapeHtml(registro.name) + '</span><span class="diary-var-history"><span class="var-unknown-label">(sin datos)</span></span></span>';
  }
  var html='<span class="diary-var diary-var-full" data-var="' + escapeHtml(registro.name) + '">';
  html+='<span class="diary-var-name">@' + escapeHtml(registro.name) + '</span>';
  html+='<span class="diary-var-history diary-var-history-full">';
  for (var i=0;i<filtered.length;i++) {
    var d=filtered[i];
    var row=registro.entries[d];
    html+='<span class="var-entry var-entry-full"><span class="var-date">' + escapeHtml(formatDisplayDate(d)) + '</span>';
    for (var j=0;j<registro.fields.length;j++) {
      var f=registro.fields[j];
      var v=row[f.name];
      var disp = v!==undefined ? escapeHtml(formatRegistroValue(v,f.type)) : '<span style="opacity:0.4">—</span>';
      html+='<br><span class="var-field-name">' + escapeHtml(f.name) + ':</span> <span class="var-value">' + disp + '</span>';
    }
    html+='</span>';
    if (i<filtered.length-1) html+='<br><br>';
  }
  html+='</span></span>';
  return html;
}
function parseRegistrosForRender(text) {
  if (!text || text.indexOf('@')===-1) return text;
  ensureRegistros();
  // No procesar si no hay registros
  // Reemplazar @Registro[/var][filter]
  return text.replace(_registroQueryRegex, function(match, regName, fieldName, filterStr) {
    var registro=getRegistroByName(regName);
    var filter=null;
    if (filterStr!==undefined) {
      filter=parseDateFilter(filterStr);
      if (filter) filter.raw=filterStr;
      else filter=null;
    }
    if (!registro) {
      return '<span class="diary-var diary-var-unknown" title="Registro inexistente">@' + escapeHtml(regName) + (fieldName?'/'+escapeHtml(fieldName):'') + (filterStr!==undefined?'['+escapeHtml(filterStr)+']':'') + ' <span class="var-unknown-label">(inexistente)</span></span>';
    }
    if (fieldName) {
      // variable concreta
      return buildRegistroFieldHistoryHtml(registro, fieldName, filter);
    } else {
      // registro completo
      return buildRegistroFullHistoryHtml(registro, filter);
    }
  });
}
function renameRegistroReferences(oldName, newName) {
  if (!oldName || !newName || oldName===newName) return;
  var escOld = oldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  var re1 = new RegExp('@' + escOld + '\\b', 'g');
  var re2 = new RegExp('@' + escOld + '\\/', 'g');
  var changed=false;
  state.notes.forEach(function(n){
    if (!n.items) return;
    n.items.forEach(function(it){
      if (!it.text || it.text.indexOf('@'+oldName)===-1) return;
      var newText = it.text.replace(re1, '@'+newName).replace(re2, '@'+newName+'/');
      // Usar replace con cuidado: re1 y re2 ya cubren casos; para @Old/var usamos re2
      // Hacemos dos pasadas: primero @Old/ -> @New/, luego @Old (solo) -> @New (cuando es @Registro sin /)
      // Pero re1 ya haría @Old -> @New incluso en @Old/var, por eso hacemos re2 primero
      // Implementación simple: reemplazar @oldName/ primero, luego @oldName seguido de no letra
      var t = it.text;
      t = t.replace(new RegExp('@' + escOld + '/', 'g'), '@' + newName + '/');
      t = t.replace(new RegExp('@' + escOld + '(?![a-zA-Z0-9_])', 'g'), '@' + newName);
      if (t!==it.text) { it.text=t; changed=true; }
    });
  });
  state.boards.forEach(function(b){
    if (!b.postits) return;
    b.postits.forEach(function(p){
      if (!p.text || p.text.indexOf('@'+oldName)===-1) return;
      var t=p.text;
      t = t.replace(new RegExp('@' + escOld + '/', 'g'), '@' + newName + '/');
      t = t.replace(new RegExp('@' + escOld + '(?![a-zA-Z0-9_])', 'g'), '@' + newName);
      if (t!==p.text) { p.text=t; changed=true; }
    });
  });
  if (changed) save();
}
function renameFieldReferences(registroName, oldField, newField) {
  if (!oldField || !newField || oldField===newField) return;
  var escOld = oldField.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  var escReg = registroName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  var changed=false;
  var re = new RegExp('@' + escReg + '\\/' + escOld + '\\b', 'g');
  state.notes.forEach(function(n){
    if (!n.items) return;
    n.items.forEach(function(it){
      if (!it.text || it.text.indexOf('@'+registroName+'/'+oldField)===-1) return;
      var t=it.text.replace(re, '@' + registroName + '/' + newField);
      if (t!==it.text) { it.text=t; changed=true; }
    });
  });
  state.boards.forEach(function(b){
    if (!b.postits) return;
    b.postits.forEach(function(p){
      if (!p.text || p.text.indexOf('@'+registroName+'/'+oldField)===-1) return;
      var t=p.text.replace(re, '@' + registroName + '/' + newField);
      if (t!==p.text) { p.text=t; changed=true; }
    });
  });
  if (changed) save();
}
/* === LaTeX / KaTeX utility functions === */
var _latexCache = {};
function _renderLatex(latex, displayMode) {
  if (!window.katex) return '<span style="color:red;">KaTeX not loaded</span>';
  var key = displayMode + '|' + latex;
  if (_latexCache[key]) return _latexCache[key];
  try {
    var html = katex.renderToString(latex, { throwOnError: false, displayMode: displayMode, output: 'html' });
    _latexCache[key] = html;
    return html;
  } catch(e) {
    return '<span class="latex-error-msg">' + t('equationError') + '</span>';
  }
}

function renderLatexInHtml(html) {
  if (!html || html.indexOf('$') === -1) return html;
  /* Block equations $$...$$ */
  html = html.replace(/\$\$([\s\S]*?)\$\$/g, function(match, latex) {
    var trimmed = latex.trim();
    if (!trimmed) return match;
    var rendered = _renderLatex(trimmed, true);
    return '<div class="katex-block" data-latex="' + escapeHtml(trimmed) + '" contenteditable="false">' + rendered + '</div>';
  });
  /* Inline equations $...$ ($$ already replaced above) */
  html = html.replace(/\$([^\n$]+?)\$/g, function(match, latex) {
    var trimmed = latex.trim();
    if (!trimmed) return match;
    var rendered = _renderLatex(trimmed, false);
    return '<span class="katex-inline" data-latex="' + escapeHtml(trimmed) + '" contenteditable="false">' + rendered + '</span>';
  });
  return html;
}

function unrenderLatexInHtml(html) {
  if (!html) return '';
  /* Block equations: revert <div class="katex-block"...> to $$...$$ */
  html = html.replace(/<div[^>]*class="katex-block"[^>]*data-latex="([^"]*)"[^>]*>[\s\S]*?<\/div>/g, function(match, latex) {
    return '$$\n' + latex + '\n$$';
  });
  /* Inline equations: revert <span class="katex-inline"...> to $...$ */
  html = html.replace(/<span[^>]*class="katex-inline"[^>]*data-latex="([^"]*)"[^>]*>[\s\S]*?<\/span>/g, function(match, latex) {
    return '$' + latex + '$';
  });
  return html;
}

/* Elimina scripts y manejadores de eventos antes de renderizar a canvas/SVG */
function sanitizeHtmlForRender(html) {
  if (!html) return '';
  var s = String(html)
    .replace(/<\s*script[\s\S]*?<\s*\/\s*script\s*>/gi, '')
    .replace(/<\s*iframe[\s\S]*?<\s*\/\s*iframe\s*>/gi, '')
    .replace(/<\s*object[\s\S]*?<\s*\/\s*object\s*>/gi, '')
    .replace(/<\s*embed[^>]*>/gi, '')
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '');
  return s;
}

function renderTextToCanvas(html, maxWidth) {
  return new Promise(function(resolve, reject) {
    try {
      var wrapper = document.createElement('div');
      wrapper.style.cssText = 'position:absolute;left:-9999px;top:0;padding:12px;background:#fff;font-size:14px;line-height:1.5;color:#000;';
      wrapper.innerHTML = sanitizeHtmlForRender(html);
      document.body.appendChild(wrapper);
      var rect = wrapper.getBoundingClientRect();
      var w = Math.max(Math.ceil(Math.min(rect.width, maxWidth || 600)) + 24, 20);
      var h = Math.max(Math.ceil(rect.height) + 24, 20);
      document.body.removeChild(wrapper);

      var safeHtml = sanitizeHtmlForRender(html);
      var data = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '">' +
        '<foreignObject width="100%" height="100%">' +
        '<div xmlns="http://www.w3.org/1999/xhtml" style="padding:12px;background:#fff;font-size:14px;line-height:1.5;color:#000;font-family:Segoe UI,system-ui,sans-serif;overflow:hidden;">' +
        safeHtml +
        '</div></foreignObject></svg>';
      var blob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var img = new Image();
      img.onload = function() {
        var canvas = document.createElement('canvas');
        canvas.width = w * 2;
        canvas.height = h * 2;
        var ctx = canvas.getContext('2d');
        ctx.scale(2, 2);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        URL.revokeObjectURL(url);
        canvas.toBlob(function(blob) {
          if (!blob) { reject(new Error('Canvas toBlob failed')); return; }
          var reader = new FileReader();
          reader.onload = function(e) {
            var base64 = e.target.result.split(',')[1];
            resolve({ base64: base64, width: w, height: h });
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        }, 'image/png');
      };
      img.onerror = function() {
        URL.revokeObjectURL(url);
        /* Fallback: draw plain text */
        var fallbackText = wrapper.textContent || 'Equation';
        var canvas = document.createElement('canvas');
        canvas.width = 400 * 2;
        canvas.height = 60 * 2;
        var ctx = canvas.getContext('2d');
        ctx.scale(2, 2);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 400, 60);
        ctx.fillStyle = '#000000';
        ctx.font = '16px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(fallbackText.substring(0, 50), 200, 30);
        canvas.toBlob(function(blob) {
          if (!blob) { reject(new Error('Canvas fallback failed')); return; }
          var reader = new FileReader();
          reader.onload = function(e) {
            var base64 = e.target.result.split(',')[1];
            resolve({ base64: base64, width: 400, height: 60 });
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        }, 'image/png');
      };
      img.src = url;
    } catch(e) {
      reject(e);
    }
  });
}

function renderLatexToDataUri(latex, displayMode) {
  return new Promise(function(resolve, reject) {
    try {
      var html = katex.renderToString(latex, { throwOnError: false, displayMode: displayMode, output: 'html' });
      var wrapper = document.createElement('div');
      wrapper.style.cssText = 'position:absolute;left:-9999px;top:0;padding:12px;background:#fff;';
      wrapper.innerHTML = html;
      document.body.appendChild(wrapper);
      var rect = wrapper.getBoundingClientRect();
      var w = Math.max(Math.ceil(rect.width) + 24, 20);
      var h = Math.max(Math.ceil(rect.height) + 24, 20);
      var canvas = document.createElement('canvas');
      canvas.width = w * 2;
      canvas.height = h * 2;
      var ctx = canvas.getContext('2d');
      ctx.scale(2, 2);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, w, h);
      /* Draw KaTeX HTML by serializing the wrapper */
      var data = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '">' +
        '<foreignObject width="100%" height="100%">' +
        '<div xmlns="http://www.w3.org/1999/xhtml" style="padding:12px;background:#fff;font-size:16px;">' +
        wrapper.innerHTML +
        '</div></foreignObject></svg>';
      var blob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var img = new Image();
      img.onload = function() {
        ctx.drawImage(img, 0, 0, w, h);
        URL.revokeObjectURL(url);
        document.body.removeChild(wrapper);
        canvas.toBlob(function(blob) {
          if (!blob) { reject(new Error('Canvas toBlob failed')); return; }
          var reader = new FileReader();
          reader.onload = function(e) {
            var base64 = e.target.result.split(',')[1];
            resolve({ dataUri: 'data:image/png;base64,' + base64, width: w, height: h });
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        }, 'image/png');
      };
      img.onerror = function() {
        /* Fallback: draw text directly */
        ctx.font = displayMode ? '22px serif' : '16px serif';
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(latex, w / 2, h / 2);
        document.body.removeChild(wrapper);
        URL.revokeObjectURL(url);
        canvas.toBlob(function(blob) {
          if (!blob) { reject(new Error('Canvas fallback failed')); return; }
          var reader = new FileReader();
          reader.onload = function(e) {
            var base64 = e.target.result.split(',')[1];
            resolve({ dataUri: 'data:image/png;base64,' + base64, width: w, height: h });
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        }, 'image/png');
      };
      img.src = url;
    } catch(e) {
      reject(e);
    }
  });
}

function openLatexEditor(noteId, itemId, latex, isBlock) {
  var overlay = document.createElement('div');
  overlay.className = 'dialog-overlay';
  overlay.style.display = 'flex';
  overlay.innerHTML =
    '<div class="dialog" style="min-width:400px;max-width:600px;">' +
    '<h3>' + t('equationEditor') + '</h3>' +
    '<div class="field"><label>' + t('equationPlaceholder') + '</label>' +
    '<textarea id="eqEditorInput" spellcheck="false">' + escapeHtml(latex || '') + '</textarea></div>' +
    '<div class="field"><label>' + t('latexPreview') + '</label>' +
    '<div id="eqEditorPreview">' + (latex ? _renderLatex(latex, isBlock) : '') + '</div></div>' +
    '<div id="eqEditorError"></div>' +
    '<div class="dialog-actions">' +
    '<button class="btn" id="eqEditorCancelBtn">' + t('cancel') + '</button>' +
    '<button class="btn btn-primary" id="eqEditorSaveBtn">' + t('save') + '</button></div></div>';
  document.body.appendChild(overlay);

  var input = document.getElementById('eqEditorInput');
  var preview = document.getElementById('eqEditorPreview');
  var error = document.getElementById('eqEditorError');
  var isBlockEq = isBlock !== false;

  function updatePreview() {
    var val = input.value.trim();
    if (!val) { preview.innerHTML = ''; error.textContent = ''; return; }
    try {
      var rendered = katex.renderToString(val, { throwOnError: false, displayMode: isBlockEq });
      preview.innerHTML = rendered;
      error.textContent = '';
    } catch(e) {
      error.textContent = t('equationError');
    }
  }

  input.addEventListener('input', updatePreview);
  document.getElementById('eqEditorCancelBtn').addEventListener('click', function() {
    document.body.removeChild(overlay);
  });
  document.getElementById('eqEditorSaveBtn').addEventListener('click', function() {
    var newLatex = input.value.trim();
    if (noteId && itemId) {
      var note = state.notes.find(function(n) { return n.id === noteId; });
      if (note) {
        var item = note.items.find(function(i) { return i.id === itemId; });
        if (item) {
          var pattern = isBlockEq ? /(\$\$[\s\S]*?\$\$)/ : /\$[^\n$]+?\$/;
          var existing = item.text || '';
          /* Replace the first matching LaTeX block in the item text */
          var replaced = false;
          var newText = existing.replace(pattern, function(match) {
            if (!replaced) { replaced = true; return isBlockEq ? '$$\n' + newLatex + '\n$$' : '$' + newLatex + '$'; }
            return match;
          });
          if (replaced) item.text = newText;
          else item.text = existing + (isBlockEq ? '\n$$\n' + newLatex + '\n$$\n' : ' $' + newLatex + '$ ');
          save();
          renderNoteContent();
        }
      }
    }
    document.body.removeChild(overlay);
  });
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) document.body.removeChild(overlay);
  });
  setTimeout(function() { input.focus(); }, 100);
}

function insertLatexBlock() {
  var noteId = state.activeNoteId;
  if (!noteId) return;
  var el = document.querySelector('.list-item[data-id="' + activeItemId + '"] .item-text[contenteditable]');
  if (!el) return;
  var sel = window.getSelection();
  var range = sel.getRangeAt(0);
  var before = range.startContainer.textContent.substring(0, range.startOffset);
  var after = range.startContainer.textContent.substring(range.startOffset);
  var latexCode = '\n$$\n\n$$\n';
  var textNode = document.createTextNode(latexCode);
  range.insertNode(textNode);
  range.setStart(textNode, 3);
  range.setEnd(textNode, 3);
  sel.removeAllRanges();
  sel.addRange(range);
  el.focus();
  updateItemText(noteId, activeItemId, el.innerHTML);
}

function navigateToNoteLink(target) {
  var note = state.notes.find(function(n) { return n.title.toLowerCase() === target.toLowerCase(); });
  if (note) { state.view = 'notes'; state.activeBoardId = null; selectNote(note.id); return; }
  var board = state.boards.find(function(b) { return b.name.toLowerCase() === target.toLowerCase(); });
  if (board) { state.view = 'board'; state.activeNoteId = null; selectBoard(board.id); return; }
  alert('Nota/tablero "' + target + '" no encontrado');
}

function openFolder(id){
  if(preventCardClick){ preventCardClick=false; return; }
  var folder=getFolderById(id); if(!folder) return;
  if(folder.pwdHash && !unlockedIds['f'+id]){
    pendingUnlock={type:'folder', id:id, action:'open'};
    document.getElementById('unlockPwdInput').value='';
    document.getElementById('unlockTitle').textContent=t('protectedFolder')+folder.name;
    showDialog('unlockDialog');
    setTimeout(function(){document.getElementById('unlockPwdInput').focus();},100);
    return;
  }
  state.activeFolderId=id;
  state.activeNoteId=null;
  save();
  renderAll();
}
function closeFolder(){
  if(state.activeFolderId!=null){
    if(state.activeFolderId) delete unlockedIds['f'+state.activeFolderId];
    state.activeFolderId=null;
    save();
    renderAll();
  } else {
    goBack();
  }
}
function updateBackBtn() {
  var btn = document.getElementById('headerBackBtn');
  var studyBtn = document.getElementById('headerStudyBtn');
  var titleEl = document.getElementById('headerCenteredTitle');
  if (!btn) return;
  if (state.view === 'notes') {
    var insideFolder = state.activeFolderId!=null && !state.activeNoteId;
    var insideNote = !!state.activeNoteId;
    btn.classList.toggle('hidden', !insideNote && !insideFolder);
    btn.onclick = insideFolder ? closeFolder : goBack;
    if (studyBtn) studyBtn.classList.add('hidden');
    if (titleEl) {
      if (state.activeNoteId) {
        var note = state.notes.find(function(n) { return n.id === state.activeNoteId; });
        if (note) { titleEl.textContent = note.title; titleEl.classList.remove('hidden'); }
        else titleEl.classList.add('hidden');
      } else if(insideFolder){
        var folder=getFolderById(state.activeFolderId);
        if(folder){ titleEl.textContent='📁 '+folder.name; titleEl.classList.remove('hidden'); }
        else titleEl.classList.add('hidden');
      } else titleEl.classList.add('hidden');
    }
  }
  else if (state.view === 'board') {
    btn.classList.toggle('hidden', !state.activeBoardId);
    if (studyBtn) studyBtn.classList.add('hidden');
    if (titleEl) {
      if (state.activeBoardId) {
        var board = state.boards.find(function(b) { return b.id === state.activeBoardId; });
        if (board) { titleEl.textContent = board.name; titleEl.classList.remove('hidden'); }
        else titleEl.classList.add('hidden');
      } else titleEl.classList.add('hidden');
    }
  }
  else if (state.view === 'diary') {
    btn.classList.toggle('hidden', !state.activeNoteId);
    if (studyBtn) studyBtn.classList.add('hidden');
    if (titleEl) {
      if (state.activeNoteId) {
        var note = state.notes.find(function(n) { return n.id === state.activeNoteId; });
        if (note) { titleEl.textContent = note.title; titleEl.classList.remove('hidden'); }
        else titleEl.classList.add('hidden');
      } else { titleEl.textContent = t('diary'); titleEl.classList.remove('hidden'); }
    }
  }
  else if (state.view === 'study') {
    btn.classList.toggle('hidden', !state.activeStudySetId || window._studyingSetId === state.activeStudySetId);
    if (titleEl) {
      if (state.activeStudySetId && window._studyingSetId !== state.activeStudySetId) {
        var set = state.studySets.find(function(s) { return s.id === state.activeStudySetId; });
        if (set) { titleEl.textContent = set.name; titleEl.classList.remove('hidden'); }
        else titleEl.classList.add('hidden');
      } else titleEl.classList.add('hidden');
    }
    if (studyBtn) {
      studyBtn.classList.toggle('hidden', !state.activeStudySetId);
      if (state.activeStudySetId) {
        var set = state.studySets.find(function(s) { return s.id === state.activeStudySetId; });
        studyBtn.classList.toggle('hidden', !set || !set.cards || set.cards.length === 0 || window._studyingSetId === set.id);
      }
    }
  } else if (state.view === 'habits') {
    btn.classList.add('hidden');
    if (studyBtn) studyBtn.classList.add('hidden');
    if (titleEl) { titleEl.textContent = t('habits'); titleEl.classList.remove('hidden'); }
  } else if (state.view === 'registros') {
    var regActive = !!state.activeRegistroId;
    btn.classList.toggle('hidden', !regActive);
    if (studyBtn) studyBtn.classList.add('hidden');
    if (titleEl) {
      if (regActive) {
        var reg = getRegistroById(state.activeRegistroId);
        titleEl.textContent = reg ? reg.name : t('registros');
        titleEl.classList.remove('hidden');
      } else { titleEl.textContent = t('registros'); titleEl.classList.remove('hidden'); }
    }
  } else if (state.view === 'cafecito') {
    btn.classList.add('hidden');
    if (studyBtn) studyBtn.classList.add('hidden');
    if (titleEl) { titleEl.textContent = 'Expandir la Biblioteca'; titleEl.classList.remove('hidden'); }
  } else {
    btn.classList.add('hidden');
    if (studyBtn) studyBtn.classList.add('hidden');
    if (titleEl) titleEl.classList.add('hidden');
  }
  var sl = document.getElementById('studyBtnLabel');
  if (sl) sl.textContent = t('study');
  var compact = (state.view === 'notes' && (state.activeNoteId || state.activeFolderId)) ||
                (state.view === 'board' && state.activeBoardId) ||
                (state.view === 'diary' && state.activeNoteId) ||
                (state.view === 'study' && state.activeStudySetId) ||
                (state.view === 'registros' && state.activeRegistroId);
  var trigger = document.querySelector('.menu-trigger');
  if (trigger) trigger.classList.toggle('compact', compact);
}

function clearCurrentUnlock() {
  if (state.activeNoteId) delete unlockedIds['n' + state.activeNoteId];
  if (state.activeBoardId) delete unlockedIds['b' + state.activeBoardId];
  if (state.activeFolderId) delete unlockedIds['f' + state.activeFolderId];
}
function goBack() {
  clearCurrentUnlock();
  _activeTableId = null; _tableSelection.itemId = null; _tableSelection.cells = [];
  if (state.view === 'notes' && state.activeFolderId!=null && !state.activeNoteId){
    state.activeFolderId=null;
    save(); renderAll(); return;
  }
  if (state.view === 'notes' && state.activeNoteId){
    // if note was inside folder, go back to folder view, not root
    var note=state.notes.find(function(n){return n.id===state.activeNoteId;});
    var wasFolderId = note && note.folderId!=null ? note.folderId : null;
    state.activeNoteId = null;
    if(wasFolderId!=null && getFolderById(wasFolderId)){
      state.activeFolderId=wasFolderId;
    }
    save(); renderAll(); return;
  }
  if (state.view === 'board') state.activeBoardId = null;
  else if (state.view === 'diary') { state.activeNoteId = null; }
  else if (state.view === 'study') { state.activeStudySetId = null; }
  else if (state.view === 'registros') {
    if (state.activeRegistroId) state.activeRegistroId = null;
    else state.activeRegistroId = null;
  }
  else state.activeNoteId = null;
  save();
  renderAll();
}
function backToNotes() { clearCurrentUnlock(); state.activeNoteId = null; save(); renderAll(); }
function backToBoards() { clearCurrentUnlock(); state.activeBoardId = null; save(); renderAll(); }

function todayDateStr() { var d = new Date(); return d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear(); }

function getOrCreateDiaryNote() {
  var dateStr = todayDateStr();
  var note = state.notes.find(function(n) { return n.diary && n.title === dateStr; });
  if (!note) {
    note = { id: genId(), title: dateStr, items: [], pwdHash: '', diary: true };
    state.notes.push(note);
    save();
  }
  return note;
}
function openTodayDiary() {
  if (!diaryUnlockFlow()) return;
  var note = getOrCreateDiaryNote();
  state.activeNoteId = note.id;
  state.view = 'diary';
  save();
  renderAll();
}

function hashPwd(s) {
  if (!s) return '';
  var h = 0;
  for (var i = 0; i < s.length; i++) { h = ((h << 5) - h) + s.charCodeAt(i); h = h & h; }
  return 'h' + Math.abs(h).toString(36);
}

var unlockedIds = {};

function switchCreateTab(tab){
  _createTab = tab;
  var notePane = document.getElementById('createNotePane');
  var folderPane = document.getElementById('createFolderPane');
  var tabNote = document.getElementById('createTabNote');
  var tabFolder = document.getElementById('createTabFolder');
  if(notePane) notePane.classList.toggle('hidden', tab!=='note');
  if(folderPane) folderPane.classList.toggle('hidden', tab!=='folder');
  if(tabNote) tabNote.classList.toggle('active', tab==='note');
  if(tabFolder) tabFolder.classList.toggle('active', tab==='folder');
  // handle subfolder hint
  var hint = document.getElementById('folderSubfolderHint');
  var folderBtn = document.getElementById('newFolderCreateBtn');
  var insideFolder = state.activeFolderId != null;
  if(hint){
    if(insideFolder){
      hint.textContent = t('subfoldersNotAllowed');
      hint.classList.remove('hidden');
    } else {
      hint.classList.add('hidden');
    }
  }
  if(folderBtn){
    folderBtn.disabled = insideFolder;
    folderBtn.style.opacity = insideFolder ? '0.4' : '';
    folderBtn.style.pointerEvents = insideFolder ? 'none' : '';
  }
  if(tabFolder) tabFolder.disabled = insideFolder;
  setTimeout(function(){
    if(tab==='note'){ var el=document.getElementById('newNoteTitle'); if(el) el.focus(); }
    else { var el2=document.getElementById('newFolderName'); if(el2 && !insideFolder) el2.focus(); }
  }, 80);
}
function showNewNoteDialog() {
  // Unified create dialog with tabs; default to Note
  _createTab = 'note';
  var pwdEl=document.getElementById('newNotePwd'); if(pwdEl) pwdEl.value='';
  var pwdF=document.getElementById('newFolderPwd'); if(pwdF) pwdF.value='';
  var nameF=document.getElementById('newFolderName'); if(nameF) nameF.value='';
  switchCreateTab('note');
  showDialog('newNoteDialog');
  setTimeout(function(){ var el=document.getElementById('newNoteTitle'); if(el) el.focus(); }, 100);
}
function showCreateDialog(){ showNewNoteDialog(); }
function createFolder(){
  if(state.activeFolderId!=null){
    var hint=document.getElementById('folderSubfolderHint');
    if(hint){ hint.textContent=t('subfoldersNotAllowed'); hint.classList.remove('hidden'); }
    return;
  }
  var nameEl=document.getElementById('newFolderName');
  var pwdEl=document.getElementById('newFolderPwd');
  var name = nameEl ? nameEl.value.trim() : '';
  if(!name) name = t('newFolderLabel');
  if(name.length>60) name=name.substring(0,60);
  var pwd = pwdEl ? pwdEl.value : '';
  var folder = { id: genId(), name: name, pwdHash: hashPwd(pwd), createdAt: Date.now() };
  state.folders.push(folder);
  ensureRootOrder();
  // rootOrder already handled by ensure, but if folder new ensure append
  if(!state.rootOrder.find(function(e){return e.type==='folder'&&e.id===folder.id;})){
    state.rootOrder.push({type:'folder', id: folder.id});
  }
  if(pwd) unlockedIds['f'+folder.id]=true;
  closeDialog('newNoteDialog');
  if(nameEl) nameEl.value='';
  if(pwdEl) pwdEl.value='';
  var titleEl=document.getElementById('newNoteTitle'); if(titleEl) titleEl.value='';
  var nPwd=document.getElementById('newNotePwd'); if(nPwd) nPwd.value='';
  save();
  renderAll();
}

var _coverNoteId = null;
function triggerImportCover(noteId) {
  _coverNoteId = noteId || state.activeNoteId;
  document.getElementById('coverInput').value = '';
  document.getElementById('coverInput').click();
}
function importCover(input) {
  if (!input.files || !input.files[0]) return;
  var file = input.files[0];
  if (file.size > 5 * 1024 * 1024) { alert(t('coverTooLarge')); return; }
  setStatus('Procesando portada...');
  ImageConverter.toWebP(file, 0.85).then(function(result) {
    var note = state.notes.find(function(n) { return n.id === _coverNoteId; });
    if (!note) return;
    var oldCover = note.cover;
    var ref = 'imagenes/cover-' + note.id + '-' + generateImageId() + '.webp';
    return ImageManager.save(ref, result.base64).then(function() {
      note.cover = 'ref:' + ref;
      save();
      renderAll();
      if (state.activeNoteId) selectNote(state.activeNoteId);
      if (oldCover && oldCover.indexOf('ref:') === 0) {
        ImageManager.delete(oldCover.substring(4)).catch(function() {});
        delete _coverUrls[oldCover.substring(4)];
      }
      setStatus('');
    });
  }).catch(function(err) {
    console.error('Error processing cover:', err);
    setStatus('');
    alert('No se pudo procesar la portada.');
  });
}
function removeCover(noteId) {
  var id = noteId || state.activeNoteId;
  var note = state.notes.find(function(n) { return n.id === id; });
  if (!note) return;
  var oldCover = note.cover;
  note.cover = '';
  save();
  renderAll();
  if (state.activeNoteId) selectNote(state.activeNoteId);
  if (oldCover && oldCover.indexOf('ref:') === 0) {
    var ref = oldCover.substring(4);
    ImageManager.delete(ref).catch(function() {});
    delete _coverUrls[ref];
  }
}
function triggerInsertImage() {
  document.getElementById('imageInput').value = '';
  document.getElementById('imageInput').click();
}
function insertImage(input) {
  if (!input.files || !input.files[0]) return;
  var file = input.files[0];
  if (file.size > 5 * 1024 * 1024) { alert('Image too large. Max 5MB.'); return; }
  var note = state.notes.find(function(n) { return n.id === state.activeNoteId; });
  if (!note) return;
  var idx = -1;
  if (activeItemId !== null) {
    note.items.forEach(function(it, i) { if (it.id === activeItemId) idx = i; });
  }
  setStatus('Convirtiendo imagen...');
  ImageConverter.toWebP(file, 0.85).then(function(result) {
    var uuid = generateImageId();
    var ref = 'imagenes/' + uuid + '.webp';
    return ImageManager.save(ref, result.base64).then(function() {
      addImageItem(note.id, idx, ref, result.width, result.height, '');
      setStatus('');
    });
  }).catch(function(err) {
    console.error('Error inserting image:', err);
    setStatus('Error al insertar imagen');
  });
}

function createNote() {
  var title = document.getElementById('newNoteTitle').value.trim() || t('newNoteLabel');
  var pwd = document.getElementById('newNotePwd').value;
  var folderId = state.activeFolderId != null ? state.activeFolderId : null;
  // if creating from inside folder, ensure folder exists and unlocked (should be already)
  var note = { id: genId(), title: title, items: [], pwdHash: hashPwd(pwd), cover: '', createdAt: Date.now(), folderId: folderId };
  state.notes.push(note);
  if(folderId==null){
    ensureRootOrder();
    if(!state.rootOrder.find(function(e){return e.type==='note'&&e.id===note.id;})){
      state.rootOrder.push({type:'note', id: note.id});
    }
  }
  state.activeNoteId = note.id;
  state.activeFolderId = null;
  if (pwd) unlockedIds['n' + note.id] = true;
  closeDialog('newNoteDialog');
  document.getElementById('newNoteTitle').value = '';
  document.getElementById('newNotePwd').value = '';
  var nf=document.getElementById('newFolderName'); if(nf) nf.value='';
  var fp=document.getElementById('newFolderPwd'); if(fp) fp.value='';
  save();
  checkMilestones();
  renderAll();
}

var pendingUnlock = null;
var pendingDelete = null;

function selectNote(id) {
  _activeTableId = null; _tableSelection.itemId = null; _tableSelection.cells = [];
  if (preventCardClick) { preventCardClick = false; return; }
  var note = state.notes.find(function(n) { return n.id === id; });
  if (!note) return;
  if (note.diary && !diaryUnlockFlow()) return;
  // Si la nota está dentro de carpeta protegida y carpeta no desbloqueada, pedir pwd de carpeta primero
  if(note.folderId!=null){
    var folder=getFolderById(note.folderId);
    if(folder && folder.pwdHash && !unlockedIds['f'+folder.id]){
      pendingUnlock={type:'folder', id:folder.id, action:'open'};
      // After folder unlock, open the note
      pendingFolderDrop={noteId:id, action:'openNote'};
      document.getElementById('unlockPwdInput').value='';
      document.getElementById('unlockTitle').textContent=t('protectedFolder')+folder.name;
      showDialog('unlockDialog');
      setTimeout(function(){ document.getElementById('unlockPwdInput').focus(); }, 100);
      return;
    }
  }
  if (note.pwdHash && !unlockedIds['n' + id]) {
    pendingUnlock = { type: 'note', id: id };
    document.getElementById('unlockPwdInput').value = '';
    document.getElementById('unlockTitle').textContent = t('protectedNote') + note.title;
    showDialog('unlockDialog');
    setTimeout(function(){ document.getElementById('unlockPwdInput').focus(); }, 100);
    return;
  }
  state.activeNoteId = id;
  save();
  renderAll();
}

function selectBoard(id) {
  _activeTableId = null; _tableSelection.itemId = null; _tableSelection.cells = [];
  var board = state.boards.find(function(b) { return b.id === id; });
  if (!board) return;
  if (board.pwdHash && !unlockedIds['b' + id]) {
    pendingUnlock = { type: 'board', id: id };
    document.getElementById('unlockPwdInput').value = '';
    document.getElementById('unlockTitle').textContent = t('protectedBoard') + board.name;
    showDialog('unlockDialog');
    setTimeout(function(){ document.getElementById('unlockPwdInput').focus(); }, 100);
    return;
  }
  state.activeBoardId = id;
  save();
  renderAll();
}

function resetUnlockDialog() {
  document.getElementById('unlockPwdInput').style.display = '';
  document.getElementById('unlockMsg').style.display = 'none';
  document.getElementById('unlockConfirmBtn').textContent = t('confirm');
}

function unlockItem() {
  var pwd = document.getElementById('unlockPwdInput').value;
  if (pendingDelete) {
    if (pendingDelete.type === 'fav-warning') {
      closeDialog('unlockDialog');
      pendingDelete = null;
      resetUnlockDialog();
      return;
    }
    var item = pendingDelete.type === 'note'
      ? state.notes.find(function(n) { return n.id === pendingDelete.id; })
      : state.boards.find(function(b) { return b.id === pendingDelete.id; });
    if (!item || hashPwd(pwd) !== item.pwdHash) {
      setStatus(t('wrongPassword'));
      document.getElementById('unlockPwdInput').value = '';
      document.getElementById('unlockPwdInput').focus();
      return;
    }
    var _pd = pendingDelete;
    closeDialog('unlockDialog');
    if (_pd.type === 'note') deleteNote(_pd.id);
    else deleteBoard(_pd.id);
    pendingDelete = null;
    return;
  }
  if (!pendingUnlock) return;
  if (pendingUnlock.type === 'diary') {
    if (hashPwd(pwd) !== state.diaryPwdHash) {
      setStatus('Contrasena incorrecta');
      document.getElementById('unlockPwdInput').value = '';
      document.getElementById('unlockPwdInput').focus();
      return;
    }
    diaryUnlocked = true;
    closeDialog('unlockDialog');
    pendingUnlock = null;
    switchView('diary');
    return;
  }
  if (pendingUnlock.type === 'folder') {
    var folder = getFolderById(pendingUnlock.id);
    if (!folder || hashPwd(pwd) !== folder.pwdHash) {
      setStatus(t('wrongPassword'));
      document.getElementById('unlockPwdInput').value = '';
      document.getElementById('unlockPwdInput').focus();
      return;
    }
    unlockedIds['f'+pendingUnlock.id]=true;
    var action = pendingUnlock.action;
    var fid = pendingUnlock.id;
    closeDialog('unlockDialog');
    pendingUnlock=null;
    if(action==='open'){
      // Check if this was actually an openNote request
      if(pendingFolderDrop && pendingFolderDrop.action==='openNote'){
        var nid=pendingFolderDrop.noteId;
        pendingFolderDrop=null;
        var note=state.notes.find(function(n){return n.id===nid;});
        if(note){
          // If note also protected, need to check its pwd now
          if(note.pwdHash && !unlockedIds['n'+nid]){
            pendingUnlock={type:'note', id:nid};
            document.getElementById('unlockPwdInput').value='';
            document.getElementById('unlockTitle').textContent=t('protectedNote')+note.title;
            showDialog('unlockDialog');
            setTimeout(function(){ document.getElementById('unlockPwdInput').focus(); }, 100);
            resetUnlockDialog();
            return;
          }
          state.activeNoteId=nid;
          state.activeFolderId=null;
          save(); renderAll();
        }
      } else {
        state.activeFolderId=fid;
        state.activeNoteId=null;
        save(); renderAll();
      }
    } else if(action==='drop'){
      if(pendingFolderDrop){
        moveNoteToFolder(pendingFolderDrop.noteId, pendingFolderDrop.folderId);
        pendingFolderDrop=null;
      }
    } else if(action==='delete'){
      // after unlock, proceed to delete confirmation already handled via pendingDeleteFolder
      if(window._pendingDeleteFolderId!=null){
        var dfId=window._pendingDeleteFolderId;
        window._pendingDeleteFolderId=null;
        confirmDeleteFolder(dfId);
      }
    } else if(action==='rename' || action==='pwd'){
      // handled via pending action reopen
      if(pendingFolderDrop && pendingFolderDrop.action){
        var act=pendingFolderDrop.action;
        pendingFolderDrop=null;
        if(act==='rename') renameFolder(fid);
        else if(act==='editPwd') editFolderPassword(fid);
      }
    }
    // also handle pendingFolderDrop for generic edit
    if(pendingFolderDrop && pendingFolderDrop.folderId===fid){
      // fallback
    }
    resetUnlockDialog();
    return;
  }
  var item = pendingUnlock.type === 'note'
    ? state.notes.find(function(n) { return n.id === pendingUnlock.id; })
    : state.boards.find(function(b) { return b.id === pendingUnlock.id; });
  if (!item || hashPwd(pwd) !== item.pwdHash) {
    setStatus('Contrasena incorrecta');
    document.getElementById('unlockPwdInput').value = '';
    document.getElementById('unlockPwdInput').focus();
    return;
  }
  var key = (pendingUnlock.type === 'note' ? 'n' : 'b') + pendingUnlock.id;
  unlockedIds[key] = true;
  if (pendingUnlock.type === 'note') state.activeNoteId = pendingUnlock.id;
  else state.activeBoardId = pendingUnlock.id;
  closeDialog('unlockDialog');
  pendingUnlock = null;
  save();
  renderAll();
}

function confirmDeleteNote(id) {
  var note = state.notes.find(function(n) { return n.id === id; });
  if (!note) return;
  if (note.favorite) {
    document.getElementById('unlockTitle').textContent = t('noteInFavorites');
    document.getElementById('unlockMsg').textContent = t('unfavoriteToDelete');
    document.getElementById('unlockMsg').style.display = '';
    document.getElementById('unlockPwdInput').style.display = 'none';
    document.getElementById('unlockConfirmBtn').textContent = t('understood');
    pendingUnlock = null; pendingDelete = { type: 'fav-warning' };
    showDialog('unlockDialog');
    return;
  }
  if (note.pwdHash && !unlockedIds['n' + id]) {
    pendingUnlock = null; pendingDelete = { type: 'note', id: id };
    document.getElementById('unlockPwdInput').value = '';
    document.getElementById('unlockTitle').textContent = t('deleteNote') + note.title;
    document.getElementById('unlockPwdInput').style.display = '';
    document.getElementById('unlockConfirmBtn').textContent = t('confirm');
    document.getElementById('unlockMsg').style.display = 'none';
    showDialog('unlockDialog');
    setTimeout(function(){ document.getElementById('unlockPwdInput').focus(); }, 100);
    return;
  }
  deleteNote(id);
}

function confirmDeleteBoard(id) {
  var board = state.boards.find(function(b) { return b.id === id; });
  if (!board) return;
  if (board.pwdHash && !unlockedIds['b' + id]) {
    pendingUnlock = null; pendingDelete = { type: 'board', id: id };
    document.getElementById('unlockPwdInput').value = '';
    document.getElementById('unlockPwdInput').style.display = '';
    document.getElementById('unlockConfirmBtn').textContent = t('confirm');
    document.getElementById('unlockMsg').style.display = 'none';
    document.getElementById('unlockTitle').textContent = t('deleteBoard') + board.name;
    showDialog('unlockDialog');
    setTimeout(function(){ document.getElementById('unlockPwdInput').focus(); }, 100);
    return;
  }
  deleteBoard(id);
}

function deleteNote(id) {
  var note = state.notes.find(function(n) { return n.id === id; });
  if (!note) return;
  cancelNoteNotifications(id);
  state.trash.push({ type: 'note', data: note, deletedAt: Date.now() });
  state.notes = state.notes.filter(function(n) { return n.id !== id; });
  // remove from rootOrder if present
  if(state.rootOrder) state.rootOrder = state.rootOrder.filter(function(e){ return !(e.type==='note'&&e.id===id); });
  if (state.activeNoteId === id){
    var wasFolder = note.folderId;
    state.activeNoteId = null;
    // if note was in folder, stay in folder view (goBack logic will handle but here we are deleting)
    // keep activeFolderId as before (if was in folder and folder still exists, stay)
  }
  save();
  renderAll();
}
function renameFolder(id){
  var folder=getFolderById(id); if(!folder) return;
  if(folder.pwdHash && !unlockedIds['f'+id]){
    pendingUnlock={type:'folder', id:id, action:'rename'};
    pendingFolderDrop={action:'rename'};
    document.getElementById('unlockPwdInput').value='';
    document.getElementById('unlockTitle').textContent=t('protectedFolder')+folder.name;
    showDialog('unlockDialog');
    setTimeout(function(){document.getElementById('unlockPwdInput').focus();},100);
    return;
  }
  var newName = prompt(t('rename')+' - '+folder.name, folder.name);
  if(newName===null) return;
  newName=newName.trim();
  if(!newName) return;
  if(newName.length>60) newName=newName.substring(0,60);
  folder.name=newName;
  save(); renderAll();
}
function editFolderPassword(id){
  var folder=getFolderById(id); if(!folder) return;
  if(folder.pwdHash && !unlockedIds['f'+id]){
    pendingUnlock={type:'folder', id:id, action:'pwd'};
    pendingFolderDrop={action:'editPwd'};
    document.getElementById('unlockPwdInput').value='';
    document.getElementById('unlockTitle').textContent=t('protectedFolder')+folder.name;
    showDialog('unlockDialog');
    setTimeout(function(){document.getElementById('unlockPwdInput').focus();},100);
    return;
  }
  var current = folder.pwdHash ? prompt(t('enterPassword')+' ('+t('protectedFolder')+folder.name+')') : null;
  if(folder.pwdHash){
    if(current===null) return;
    if(hashPwd(current)!==folder.pwdHash){ alert(t('wrongPassword')); return; }
  }
  var newPwd = prompt(t('passwordOptional')+'\n'+t('leaveEmpty')+' - '+folder.name, '');
  if(newPwd===null) return;
  folder.pwdHash = hashPwd(newPwd);
  if(newPwd) unlockedIds['f'+id]=true; else delete unlockedIds['f'+id];
  save(); renderAll();
}
function confirmDeleteFolder(id){
  var folder=getFolderById(id); if(!folder) return;
  if(folder.pwdHash && !unlockedIds['f'+id]){
    window._pendingDeleteFolderId=id;
    pendingUnlock={type:'folder', id:id, action:'delete'};
    document.getElementById('unlockPwdInput').value='';
    document.getElementById('unlockTitle').textContent=t('protectedFolder')+folder.name;
    showDialog('unlockDialog');
    setTimeout(function(){document.getElementById('unlockPwdInput').focus();},100);
    return;
  }
  var cnt=countNotesInFolder(id);
  var msg = t('deleteFolder')+' "'+folder.name+'"?';
  if(cnt>0) msg += '\n\n' + t('deleteFolderMsg').replace('{n}', cnt);
  else msg += '\n\n' + t('deleteFolderEmpty');
  if(!confirm(msg)) return;
  // mover notas a raíz
  var moved=[];
  state.notes.forEach(function(n){ if(n.folderId===id){ n.folderId=null; moved.push(n.id); }});
  // eliminar carpeta
  state.folders = state.folders.filter(function(f){ return f.id!==id; });
  state.rootOrder = state.rootOrder.filter(function(e){ return !(e.type==='folder'&&e.id===id); });
  // agregar notas movidas al final de rootOrder en orden de aparición
  moved.forEach(function(nid){
    if(!state.rootOrder.find(function(e){return e.type==='note'&&e.id===nid;})){
      state.rootOrder.push({type:'note', id:nid});
    }
  });
  if(state.activeFolderId===id) state.activeFolderId=null;
  delete unlockedIds['f'+id];
  save(); renderAll();
}
function showMoveToFolderDialog(noteId){
  var note=state.notes.find(function(n){return n.id===noteId;}); if(!note) return;
  if(state.folders.length===0) return;
  var opts = state.folders.map(function(f){ return f.id+': '+f.name+(f.pwdHash?' 🔒':'')+' ('+countNotesInFolder(f.id)+')'; }).join('\n');
  var input = prompt(t('moveToFolder')+'\n'+opts+'\n\n'+t('enterFolderId'), '');
  if(input===null) return;
  var fid=Number(input.trim().split(':')[0]);
  if(!fid || !getFolderById(fid)){ alert(t('invalidFolder')); return; }
  var folder=getFolderById(fid);
  if(folder.pwdHash && !unlockedIds['f'+fid]){
    pendingFolderDrop={noteId:noteId, folderId:fid};
    pendingUnlock={type:'folder', id:fid, action:'drop'};
    document.getElementById('unlockPwdInput').value='';
    document.getElementById('unlockTitle').textContent=t('protectedFolder')+folder.name;
    showDialog('unlockDialog');
    setTimeout(function(){document.getElementById('unlockPwdInput').focus();},100);
    return;
  }
  moveNoteToFolder(noteId, fid);
}
function deleteBoard(id) {
  var board = state.boards.find(function(b) { return b.id === id; });
  if (!board) return;
  state.trash.push({ type: 'board', data: board, deletedAt: Date.now() });
  state.boards = state.boards.filter(function(b) { return b.id !== id; });
  if (state.activeBoardId === id) state.activeBoardId = state.boards.length > 0 ? state.boards[0].id : null;
  save();
  renderAll();
}
function deleteStudySet(id) {
  var set = state.studySets.find(function(s) { return s.id === id; });
  if (!set) return;
  state.trash.push({ type: 'studySet', data: set, deletedAt: Date.now() });
  state.studySets = state.studySets.filter(function(s) { return s.id !== id; });
  if (state.activeStudySetId === id) state.activeStudySetId = null;
  save();
  renderAll();
}
function restoreFromTrash(index) {
  var item = state.trash[index];
  if (!item) return;
  if (item.type === 'note'){
    if(item.data.folderId===undefined) item.data.folderId=null;
    if(item.data.folderId!=null && !getFolderById(item.data.folderId)) item.data.folderId=null;
    state.notes.push(item.data);
    if(item.data.folderId==null){
      ensureRootOrder();
      if(!state.rootOrder.find(function(e){return e.type==='note'&&e.id===item.data.id;})){
        state.rootOrder.push({type:'note', id:item.data.id});
      }
    }
  }
  else if (item.type === 'board') state.boards.push(item.data);
  else if (item.type === 'studySet') state.studySets.push(item.data);
  else if (item.type === 'registro') state.registros.push(item.data);
  state.trash.splice(index, 1);
  save();
  renderAll();
}
function deleteFromTrashPermanently(index) {
  var removed = state.trash[index];
  state.trash.splice(index, 1);
  save();
  renderAll();
  if (!removed || !removed.data) return;
  var refsToDelete = [];
  if (removed.type === 'note' && removed.data.items) {
    removed.data.items.forEach(function(item) {
      var itemRef = item.src || item.ref;
      if ((item.type === 'image' || item.type === 'audio' || item.type === 'video') && itemRef) {
        refsToDelete.push(itemRef);
      }
    });
  } else if (removed.type === 'board' && removed.data.elements) {
    removed.data.elements.forEach(function(el) {
      if (el.ref) refsToDelete.push(el.ref);
    });
  }
  if (refsToDelete.length === 0) return;
  var activeRefs = ImageManager.collectUsedRefs ? ImageManager.collectUsedRefs() : [];
  refsToDelete.forEach(function(ref) {
    if (_mediaBlobUrls[ref]) {
      URL.revokeObjectURL(_mediaBlobUrls[ref]);
      delete _mediaBlobUrls[ref];
    }
    if (activeRefs.indexOf(ref) === -1) {
      ImageManager.delete(ref).catch(function(err) {
        console.warn('Error deleting orphan media:', ref, err);
      });
    }
  });
}
function cleanupTrash() {
  var cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
  state.trash = state.trash.filter(function(item) { return item.deletedAt > cutoff; });
}

function addItem(type, afterIndex, level) {
  var note = state.notes.find(function(n) { return n.id === state.activeNoteId; });
  if (!note) return;
  var newItem = { id: genId(), text: '', checked: false, level: level || 0, type: type || 'list' };
  if (afterIndex !== undefined && afterIndex >= 0) {
    note.items.splice(afterIndex + 1, 0, newItem);
  } else if (activeItemId !== null) {
    var idx = -1;
    note.items.forEach(function(it, i) { if (it.id === activeItemId) idx = i; });
    if (idx >= 0) {
      note.items.splice(idx + 1, 0, newItem);
    } else {
      note.items.push(newItem);
    }
  } else {
    note.items.push(newItem);
  }
  save();
  renderNoteContent();
  var idx = note.items.indexOf(newItem);
  var items = document.querySelectorAll('.list-item .item-text[contenteditable]');
  if (items.length > idx && idx >= 0) { items[idx].focus(); placeCaretAtEnd(items[idx]); }
}
function addTextItem() { addItem('text'); }

/* Inserta un item de tipo imagen en la nota activa */
function addImageItem(noteId, afterIndex, src, width, height, caption) {
  var note = state.notes.find(function(n) { return n.id === noteId; });
  if (!note) return;
  var newItem = { id: genId(), type: 'image', src: src, width: width || 0, height: height || 0, caption: caption || '' };
  if (afterIndex !== undefined && afterIndex >= 0) {
    note.items.splice(afterIndex + 1, 0, newItem);
  } else {
    note.items.push(newItem);
  }
  save();
  renderNoteContent();
}

/* Actualiza el caption de un item imagen */
function updateImageCaption(noteId, itemId, html) {
  var note = state.notes.find(function(n) { return n.id === noteId; });
  if (!note) return;
  var item = note.items.find(function(i) { return i.id === itemId; });
  if (item) { item.caption = html || ''; save(); }
}

/* Carga las imágenes desde el sistema de archivos después del render */
function loadNoteImages() {
  var imgs = document.querySelectorAll('.image-item img[data-ref]');
  [].forEach.call(imgs, function(img) {
    var ref = img.getAttribute('data-ref');
    if (!ref) return;
    img.removeAttribute('data-ref');
    img.classList.add('image-loading');
    ImageManager.read(ref).then(function(base64) {
      img.classList.remove('image-loading');
      if (base64) {
        var mime = ImageConverter.getMimeFromRef(ref);
        img.src = 'data:' + mime + ';base64,' + base64;
      } else {
        img.alt = 'Imagen no encontrada';
        img.classList.add('image-missing');
      }
    }).catch(function(err) {
      img.classList.remove('image-loading');
      img.alt = 'Error al cargar';
      img.classList.add('image-missing');
      console.error('Error loading image:', ref, err);
    });
  });
}

var _tableSelection = { itemId: null, cells: [] };
var _activeTableId = null;
var _isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
var _tableLongPressTimer = null;
var _skipNextTableMouseDown = false;

// Desktop: click table cell to set single selection
document.addEventListener('mousedown', function(e) {
  var td = e.target.closest('.note-table td');
  if (!td || _skipNextTableMouseDown) { _skipNextTableMouseDown = false; return; }
  var tableId = Number(td.dataset.tableId);
  var idx = Number(td.dataset.idx);
  _activeTableId = tableId;
  if (e.ctrlKey || e.metaKey) {
    if (_tableSelection.itemId !== tableId) { _tableSelection.itemId = tableId; _tableSelection.cells = []; }
    var pos = _tableSelection.cells.indexOf(idx);
    if (pos >= 0) _tableSelection.cells.splice(pos, 1);
    else _tableSelection.cells.push(idx);
    renderNoteContent();
  } else {
    _tableSelection.itemId = tableId; _tableSelection.cells = [idx];
  }
});

// Prevent fmt-bar buttons from stealing focus / losing text selection
document.addEventListener('mousedown', function(e) {
  if (!e.target.closest('.fmt-bar')) return;
  if (e.target.closest('button') || e.target.closest('.hl-color')) e.preventDefault();
}, true);

// Mobile: long-press to toggle table cell selection
if (_isTouchDevice) {
  document.addEventListener('touchstart', function(e) {
    var td = e.target.closest('.note-table td');
    if (!td) return;
    if (e.target.closest('button, .item-actions')) return;
    var tableId = Number(td.dataset.tableId);
    var idx = Number(td.dataset.idx);
    _skipNextTableMouseDown = true;
    _tableLongPressTimer = setTimeout(function() {
      _tableLongPressTimer = null;
      _activeTableId = tableId;
      if (_tableSelection.itemId !== tableId) { _tableSelection.itemId = tableId; _tableSelection.cells = []; }
      var pos = _tableSelection.cells.indexOf(idx);
      if (pos >= 0) _tableSelection.cells.splice(pos, 1);
      else _tableSelection.cells.push(idx);
      renderNoteContent();
    }, 500);
  }, { passive: true });
  document.addEventListener('touchmove', function(e) {
    if (_tableLongPressTimer) { clearTimeout(_tableLongPressTimer); _tableLongPressTimer = null; }
  }, { passive: true });
  document.addEventListener('touchend', function(e) {
    if (_tableLongPressTimer) { clearTimeout(_tableLongPressTimer); _tableLongPressTimer = null; }
    _skipNextTableMouseDown = false;
  }, { passive: true });
}

function showTableDialog() {
  document.getElementById('tableRows').value = 3;
  document.getElementById('tableCols').value = 3;
  showDialog('tableDialog');
  setTimeout(function(){ document.getElementById('tableRows').focus(); }, 100);
}
function createTable() {
  var rows = parseInt(document.getElementById('tableRows').value) || 3;
  var cols = parseInt(document.getElementById('tableCols').value) || 3;
  if (rows < 1) rows = 1; if (cols < 1) cols = 1;
  if (rows > 20) rows = 20; if (cols > 20) cols = 20;
  var cells = [];
  for (var i = 0; i < rows * cols; i++) cells.push({ text: '', rowspan: 1, colspan: 1 });
  var item = { id: genId(), type: 'table', rows: rows, cols: cols, cells: cells };
  var note = state.notes.find(function(n) { return n.id === state.activeNoteId; });
  if (!note) return;
  note.items.push(item);
  save();
  closeDialog('tableDialog');
  renderNoteContent();
}
function renderTableData(item, noteId) {
  var R = item.rows, C = item.cols, cells = item.cells;
  if (!cells || cells.length === 0) return '<div style="color:var(--text-muted);padding:8px;">Empty table</div>';
  var html = '<div class="note-table-wrap"' + (item.align ? ' style="text-align:' + item.align + ';"' : '') + '><table class="note-table" data-table-id="' + item.id + '">';
  var idx = 0;
  for (var r = 0; r < R; r++) {
    html += '<tr>';
    for (var c = 0; c < C; c++) {
      var cell = cells[idx]; idx++;
      if (!cell) continue;
      var nid = noteId || 'null';
      var classes = [];
      if (_tableSelection.itemId === item.id && _tableSelection.cells.indexOf(idx - 1) >= 0) classes.push('selected');
      html += '<td contenteditable="true" class="' + classes.join(' ') + '" data-r="' + r + '" data-c="' + c + '" data-table-id="' + item.id + '" data-idx="' + (idx - 1) + '" oninput="updateTableText(' + nid + ',' + item.id + ',' + (idx-1) + ',this.innerHTML)"';
      if (cell.colspan > 1) html += ' colspan="' + cell.colspan + '"';
      if (cell.rowspan > 1) html += ' rowspan="' + cell.rowspan + '"';
      html += '>' + (cell.text || '') + '</td>';
    }
    html += '</tr>';
  }
  html += '</table></div>';
  return html;
}
function updateTableText(noteId, itemId, idx, html) {
  var note = state.notes.find(function(n) { return n.id === noteId; });
  if (!note) return;
  var item = note.items.find(function(i) { return i.id === itemId; });
  if (item && item.cells && item.cells[idx]) { item.cells[idx].text = html || ''; save(); }
}
function mergeSelectedCells(noteId, itemId) {
  var note = state.notes.find(function(n) { return n.id === noteId; });
  if (!note) return;
  var item = note.items.find(function(i) { return i.id === itemId; });
  if (!item || !item.cells || _tableSelection.cells.length < 2) return;
  var C = item.cols;
  var indices = _tableSelection.cells.slice().sort(function(a,b){return a-b;});
  var rows = indices.map(function(idx){ return Math.floor(idx / C); });
  var cols = indices.map(function(idx){ return idx % C; });
  var r1 = Math.min.apply(null, rows), r2 = Math.max.apply(null, rows);
  var c1 = Math.min.apply(null, cols), c2 = Math.max.apply(null, cols);
  var newRowspan = r2 - r1 + 1, newColspan = c2 - c1 + 1;
  var mergedText = '';
  indices.forEach(function(idx) {
    if (item.cells[idx]) { mergedText += (mergedText ? ' ' : '') + (item.cells[idx].text || ''); }
  });
  for (var r = r1; r <= r2; r++) {
    for (var c = c1; c <= c2; c++) {
      var idx2 = r * C + c;
      if (r === r1 && c === c1) { item.cells[idx2] = { text: mergedText, rowspan: newRowspan, colspan: newColspan }; }
      else { item.cells[idx2] = null; }
    }
  }
  _tableSelection.itemId = null; _tableSelection.cells = []; _activeTableId = null;
  save(); renderNoteContent();
}
function splitTableCells(noteId, itemId) {
  var note = state.notes.find(function(n) { return n.id === noteId; });
  if (!note) return;
  var item = note.items.find(function(i) { return i.id === itemId; });
  if (!item || !item.cells || _tableSelection.cells.length !== 1) return;
  var idx = _tableSelection.cells[0];
  var cell = item.cells[idx];
  if (!cell || (cell.rowspan === 1 && cell.colspan === 1)) return;
  var C = item.cols;
  var r = Math.floor(idx / C), c = idx % C;
  var rs = cell.rowspan, cs = cell.colspan;
  var text = cell.text || '';
  for (var rr = r; rr < r + rs; rr++) {
    for (var cc = c; cc < c + cs; cc++) {
      var idx2 = rr * C + cc;
      if (rr === r && cc === c) { item.cells[idx2] = { text: text, rowspan: 1, colspan: 1 }; }
      else { item.cells[idx2] = { text: '', rowspan: 1, colspan: 1 }; }
    }
  }
  _tableSelection.itemId = null; _tableSelection.cells = [];
  save(); renderNoteContent();
}

function deleteItem(noteId, itemId) {
  var note = state.notes.find(function(n) { return n.id === noteId; });
  if (!note) return;
  var removed = null;
  note.items = note.items.filter(function(i) {
    if (i.id === itemId && (i.type === 'image' || i.type === 'audio' || i.type === 'video')) removed = i;
    return i.id !== itemId;
  });
  save();
  renderNoteContent();
  if (removed && (removed.src || removed.ref)) {
    var ref = removed.src || removed.ref;
    var stillUsed = false;
    function checkItems(items) {
      items.forEach(function(it) {
        var r = it.src || it.ref;
        if (r === ref) stillUsed = true;
      });
    }
    state.notes.forEach(function(n) { checkItems(n.items); });
    state.trash.forEach(function(t) {
      if (t.type === 'note' && t.data) checkItems(t.data.items || []);
    });
    if (!stillUsed) {
      if (_mediaBlobUrls[ref]) {
        URL.revokeObjectURL(_mediaBlobUrls[ref]);
        delete _mediaBlobUrls[ref];
      }
      ImageManager.delete(ref).catch(function(err) {
        console.warn('Error deleting orphan media:', ref, err);
      });
    }
  }
}

function toggleItem(noteId, itemId) {
  var note = state.notes.find(function(n) { return n.id === noteId; });
  if (!note) return;
  var item = note.items.find(function(i) { return i.id === itemId; });
  if (!item) return;
  item.checked = !item.checked;
  var idx = note.items.indexOf(item);
  note.items.splice(idx, 1);
  function isListType(it) { return !it.type || it.type === 'list'; }
  var insertAt = -1;
  if (item.checked) {
    insertAt = note.items.length;
    for (var i = 0; i < note.items.length; i++) {
      if (isListType(note.items[i])) insertAt = i + 1;
    }
  } else {
    for (var i = 0; i < note.items.length; i++) {
      if (isListType(note.items[i]) && note.items[i].checked) { insertAt = i; break; }
    }
    if (insertAt < 0) {
      insertAt = note.items.length;
      for (var i = 0; i < note.items.length; i++) {
        if (isListType(note.items[i])) insertAt = i + 1;
      }
    }
  }
  note.items.splice(insertAt, 0, item);
  save();
  renderNoteContent();
}

function updateItemText(noteId, itemId, html) {
  var note = state.notes.find(function(n) { return n.id === noteId; });
  if (!note) return;
  var item = note.items.find(function(i) { return i.id === itemId; });
  if (item) {
    var newText = unparseNoteLinks(unrenderLatexInHtml(html || ''));
    item.text = newText;
    if (note.diary) {
      processDiaryVariableAssignments(note, html || '');
      processRegistroAssignments(note, html || '');
    }
    save();
  }
}
/* Evaluador aritmético seguro (shunting-yard) sin eval/Function */
function evaluateExpression(expr) {
  var tokens = expr.match(/(\d+\.?\d*|\.\d+|[+\-*\/%^()])/g);
  if (!tokens) return NaN;
  var ops = [];
  var vals = [];
  var prec = { '+': 1, '-': 1, '*': 2, '/': 2, '%': 2, '^': 3, 'u-': 4 };
  function apply() {
    var op = ops.pop();
    if (op === 'u-') { vals.push(-(vals.pop() || 0)); return; }
    var b = vals.pop(), a = vals.pop();
    if (a === undefined || b === undefined) throw new Error('bad expr');
    var r;
    switch (op) {
      case '+': r = a + b; break;
      case '-': r = a - b; break;
      case '*': r = a * b; break;
      case '/': r = a / b; break;
      case '%': r = a % b; break;
      case '^': r = Math.pow(a, b); break;
    }
    vals.push(r);
  }
  for (var i = 0; i < tokens.length; i++) {
    var tok = tokens[i];
    if (/\d/.test(tok)) {
      vals.push(parseFloat(tok));
    } else if (tok === '(') {
      ops.push(tok);
    } else if (tok === ')') {
      while (ops.length && ops[ops.length - 1] !== '(') apply();
      ops.pop();
    } else {
      var op = tok;
      if (op === '-' && (i === 0 || tokens[i - 1] === '(' || ['+', '-', '*', '/', '%', '^'].indexOf(tokens[i - 1]) !== -1)) op = 'u-';
      while (ops.length && ops[ops.length - 1] !== '(' && prec[op] <= prec[ops[ops.length - 1]]) apply();
      ops.push(op);
    }
  }
  while (ops.length) apply();
  if (vals.length !== 1) return NaN;
  return vals[0];
}

function computeOnEquals(el, noteId, itemId) {
  var text = el.textContent;
  if (!text.endsWith('=')) return;
  var expr = text.slice(0, -1).trim();
  if (!expr) return;
  var sanitized = expr.replace(/[^0-9+\-*/.%\^()\s]/g, '');
  if (!sanitized) return;
  try {
    var result = evaluateExpression(sanitized);
    if (typeof result !== 'number' || !isFinite(result)) return;
    var textNode = document.createTextNode(String(Number.isInteger(result) ? result : parseFloat(result.toFixed(4))));
    el.appendChild(textNode);
    var sel = window.getSelection();
    var range = document.createRange();
    range.setStartAfter(textNode); range.collapse(true);
    sel.removeAllRanges(); sel.addRange(range);
    updateItemText(noteId, itemId, el.innerHTML);
  } catch(e) {}
}

var activeItemId = null;

function formatBold() { document.execCommand('bold'); updateFmtBar(); saveActiveItem(); }
function formatItalic() { document.execCommand('italic'); updateFmtBar(); saveActiveItem(); }
function formatUnderline() { document.execCommand('underline'); updateFmtBar(); saveActiveItem(); }
function formatBulletList() { document.execCommand('insertUnorderedList'); saveActiveItem(); }
function formatNumberedList() { document.execCommand('insertOrderedList'); saveActiveItem(); }
var _alignCycle = ['left', 'center', 'right', 'justify'];
var _alignCycleIdx = 0;
function cycleAlignment() {
  var align = _alignCycle[_alignCycleIdx];
  _alignCycleIdx = (_alignCycleIdx + 1) % 4;
  var cmds = { left: 'justifyLeft', center: 'justifyCenter', right: 'justifyRight', justify: 'justifyFull' };
  var icons = { left: '\u2190', center: '\u2194', right: '\u2192', justify: '\u21C4' };
  var activeEl = document.activeElement;
  var inTableCell = activeEl && activeEl.closest('.note-table td');
  if (!inTableCell && _activeTableId && _tableSelection.itemId) {
    var note = state.notes.find(function(n) { return n.id === state.activeNoteId; });
    if (note) {
      var item = note.items.find(function(i) { return i.id === _tableSelection.itemId; });
      if (item && item.type === 'table') {
        if (align === 'left') delete item.align;
        else item.align = align;
        save(); renderNoteContent();
        var btn = document.querySelector('.fmt-align-btn');
        if (btn) btn.textContent = icons[align];
        return;
      }
    }
  }
  document.execCommand(cmds[align] || 'justifyLeft');
  saveActiveItem();
  var btn = document.querySelector('.fmt-align-btn');
  if (btn) btn.textContent = icons[align];
}
var _hlColor = '#ffff00';
function selectHighlightColor(color) {
  _hlColor = color;
  document.getElementById('hlPalette').classList.add('hidden');
  var span = document.querySelector('.hl-toggle span');
  if (span) span.style.background = color;
}
function selectRemoveHighlight() {
  _hlColor = 'transparent';
  document.getElementById('hlPalette').classList.add('hidden');
  var span = document.querySelector('.hl-toggle span');
  if (span) span.style.background = 'transparent';
}
function applyHighlight() {
  document.execCommand('hiliteColor', false, _hlColor);
  saveActiveItem();
}
function toggleHighlightPalette() {
  var palette = document.getElementById('hlPalette');
  if (!palette) return;
  if (palette.classList.contains('hidden')) {
    var btn = document.querySelector('.hl-toggle');
    if (btn) {
      var r = btn.getBoundingClientRect();
      palette.style.left = r.left + 'px';
      palette.style.bottom = (window.innerHeight - r.top + 4) + 'px';
      palette.style.top = 'auto';
      palette.classList.remove('hidden');
      var ph = palette.offsetHeight;
      if (r.top < ph + 4) {
        if (window.innerHeight - r.bottom > ph + 4) {
          palette.style.bottom = 'auto';
          palette.style.top = (r.bottom + 4) + 'px';
        } else {
          palette.style.top = '4px';
          palette.style.bottom = 'auto';
        }
      }
    } else {
      palette.classList.remove('hidden');
    }
  } else {
    palette.classList.add('hidden');
  }
}

function updateFmtBar() {
  var b = document.getElementById('fmtBold');
  var i = document.getElementById('fmtItalic');
  var u = document.getElementById('fmtUnderline');
  if (b) b.classList.toggle('active', document.queryCommandState('bold'));
  if (i) i.classList.toggle('active', document.queryCommandState('italic'));
  if (u) u.classList.toggle('active', document.queryCommandState('underline'));
}

function saveActiveItem() {
  if (activeItemId) {
    var el = document.querySelector('.list-item[data-id="' + activeItemId + '"] .item-text[contenteditable]');
    if (el) updateItemText(getActiveNoteId(), activeItemId, el.innerHTML);
  }
}

function getActiveNoteId() {
  var area = document.querySelector('.items-area');
  return area ? Number(area.dataset.noteId) : null;
}

function placeCaretAtEnd(el) {
  el.focus();
  if (typeof window.getSelection !== 'undefined' && typeof document.createRange !== 'undefined') {
    var range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
}

function updateNoteTitle(noteId, title) {
  var note = state.notes.find(function(n) { return n.id === noteId; });
  if (note) { note.title = title; save(); }
}
function renameNote(noteId) {
  var note = state.notes.find(function(n) { return n.id === noteId; });
  if (!note) return;
  var name = prompt(t('rename'), note.title);
  if (name && name.trim()) { note.title = name.trim(); save(); renderNoteContent(); }
}
function renameBoard(boardId) {
  var board = state.boards.find(function(b) { return b.id === boardId; });
  if (!board) return;
  var name = prompt(t('rename'), board.name);
  if (name && name.trim()) { board.name = name.trim(); save(); renderBoardContent(); }
}

function indentItem(noteId, itemId) {
  var note = state.notes.find(function(n) { return n.id === noteId; });
  if (!note) return;
  var item = note.items.find(function(i) { return i.id === itemId; });
  if (item && item.level < 5) {
    item.level++;
    save();
    var el = document.querySelector('.list-item[data-id="' + itemId + '"]');
    if (el) el.dataset.level = item.level;
  }
}

function outdentItem(noteId, itemId) {
  var note = state.notes.find(function(n) { return n.id === noteId; });
  if (!note) return;
  var item = note.items.find(function(i) { return i.id === itemId; });
  if (item && item.level > 0) {
    item.level--;
    save();
    var el = document.querySelector('.list-item[data-id="' + itemId + '"]');
    if (el) el.dataset.level = item.level;
  }
}

function getNotePreview(note) {
  if (note.pwdHash && !unlockedIds['n' + note.id]) return t('passwordProtected');
  if (!note.items || note.items.length === 0) return t('noContent');
  var texts = [];
  for (var i = 0; i < Math.min(note.items.length, 3); i++) {
    var item = note.items[i];
    if (!item || item.type === 'table') continue;
    if (item.type === 'image') {
      texts.push(item.caption ? '\uD83D\uDDBC ' + item.caption : '\uD83D\uDDBC Imagen');
      continue;
    }
    if (!item.text) continue;
    var txt = item.text.replace(/<[^>]*>/g, '').trim();
    if (txt) texts.push(txt.length > 60 ? txt.substring(0, 60) + '...' : txt);
  }
  return texts.length > 0 ? texts.join('<br>') : t('noContent');
}

// --- Study Cards ---
function renderStudyContent() {
  var container = document.getElementById('studyContent');
  if (state.activeStudySetId) {
    renderStudySetCards(container);
  } else {
    renderStudySetList(container);
  }
}
function renderStudySetList(container) {
  var html = '<div class="selection-view"><div class="selection-header"><h2>' + t('studyCards') + '</h2></div><div class="selection-grid">';
  state.studySets.forEach(function(set) {
    var cardCount = set.cards ? set.cards.length : 0;
    html += '<div class="card" data-study-set-id="' + set.id + '" onclick="selectStudySet(' + set.id + ')" style="cursor:pointer;position:relative;"><span class="card-drag-handle" onclick="event.stopPropagation()"><span class="drag-icon">&#x2630;</span></span><div style="font-weight:600;padding:36px 12px 0;">' + escapeHtml(set.name) + '</div><div style="font-size:12px;opacity:0.6;padding:4px 12px 36px;">' + cardCount + ' ' + t('cardList').toLowerCase() + '</div><button class="card-btn" onclick="event.stopPropagation();renameStudySet(' + set.id + ')" style="position:absolute;bottom:8px;right:8px;" title="' + t('edit') + '">&#x270F;</button></div>';
  });
  html += '</div></div>';
  container.innerHTML = html;
  updateBackBtn();
}
function selectStudySet(id) { state.activeStudySetId = id; save(); renderAll(); }
function showNewStudySetDialog() {
  document.getElementById('newStudySetName').value = '';
  showDialog('newStudySetDialog');
  setTimeout(function(){ document.getElementById('newStudySetName').focus(); }, 100);
}
function createStudySet() {
  var name = document.getElementById('newStudySetName').value.trim() || t('newSet');
  state.studySets.push({ id: genId(), name: name, cards: [] });
  closeDialog('newStudySetDialog');
  document.getElementById('newStudySetName').value = '';
  save();
  checkMilestones();
  renderStudyContent();
}
function renameStudySet(id) {
  var set = state.studySets.find(function(s) { return s.id === id; });
  if (!set) return;
  var name = prompt(t('enterSetName'), set.name);
  if (name && name.trim()) { set.name = name.trim(); save(); renderStudyContent(); }
}
function renderStudySetCards(container) {
  var set = state.studySets.find(function(s) { return s.id === state.activeStudySetId; });
  if (!set) { state.activeStudySetId = null; renderStudySetList(container); return; }
  var studying = window._studyingSetId === set.id;
  if (studying) { renderStudyMode(container, set); return; }
  var html = '<div style="padding:20px;box-sizing:border-box;">';
  if (!set.cards || set.cards.length === 0) { html += '<div style="text-align:center;padding:40px;opacity:0.5;">' + t('noCards') + '</div>'; }
  else {
    html += '<div class="study-set-cards" style="display:flex;flex-wrap:wrap;gap:16px;">';
    set.cards.forEach(function(card, i) {
      html += '<div class="study-card-item" data-card-id="' + card.id + '" style="flex:0 0 100%;min-height:160px;background:var(--surface);border-radius:10px;padding:36px 12px 36px;border:1px solid var(--border);display:flex;flex-direction:column;gap:4px;box-sizing:border-box;position:relative;"><span class="card-drag-handle" onclick="event.stopPropagation()"><span class="drag-icon">&#x2630;</span></span><div style="font-weight:600;font-size:18px;"><span style="opacity:0.4;">' + (i+1) + '.</span> ' + renderCardContent(card.front) + '</div><div style="opacity:0.7;font-size:15px;">' + renderCardContent(card.back) + '</div><button class="card-btn" onclick="deleteStudyCard(' + set.id + ',' + card.id + ')" style="position:absolute;top:8px;right:8px;" title="' + t('del') + '">&#x2716;</button><button class="card-btn" onclick="editStudyCard(' + set.id + ',' + card.id + ')" style="position:absolute;bottom:8px;right:8px;" title="' + t('edit') + '">&#x270F;</button></div>';
    });
    html += '</div>';
  }
  html += '</div>';
  container.innerHTML = html;
  updateBackBtn();
  loadStudyCardImages(container);
}
function startStudy(setId) {
  window._studyingSetId = setId;
  window._studyCards = state.studySets.find(function(s) { return s.id === setId; }).cards.slice();
  for (var i = window._studyCards.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = window._studyCards[i];
    window._studyCards[i] = window._studyCards[j];
    window._studyCards[j] = tmp;
  }
  window._studyTotal = window._studyCards.length;
  window._studyIndex = 0;
  window._studyRevealed = false;
  window._studyComplete = false;
  renderAll();
}
function stopStudy() {
  window._studyingSetId = null; window._studyCards = null; window._studyTotal = 0; window._studyIndex = 0; window._studyRevealed = false; window._studyComplete = false;
  renderAll();
}
function renderStudyMode(container, set) {
  var cards = window._studyCards;
  if (!cards || cards.length === 0) {
    container.innerHTML = '<div class="study-mode-wrapper"><div style="text-align:center;opacity:0.5;">' + t('noCards') + '</div></div>';
    updateBackBtn(); return;
  }
  if (window._studyIndex >= cards.length) {
    container.innerHTML = '<div class="study-mode-wrapper"><div class="study-mode-header"><span class="study-mode-title">' + escapeHtml(set.name) + '</span><button class="btn fmt-action" onclick="stopStudy()">' + t('backToSets') + '</button></div><div class="study-mode-card-area" style="justify-content:center;"><div style="width:100%;max-width:600px;text-align:center;"><div style="font-size:48px;margin-bottom:16px;">&#x1f389;</div><h2>' + t('study') + ' ' + t('backToSets') + '!</h2></div></div></div>';
    updateBackBtn(); return;
  }
  var card = cards[window._studyIndex];
  var html = '<div class="study-mode-wrapper">';
  html += '<div class="study-mode-header"><span class="study-mode-title">' + escapeHtml(set.name) + '</span><button class="btn fmt-action" onclick="stopStudy()">' + t('backToSets') + '</button></div>';
  html += '<div class="study-mode-card-area"><div style="width:100%;text-align:center;">';
  html += '<div class="study-counter">' + window._studyIndex + ' / ' + window._studyTotal + '</div>';
  html += '<div class="study-card" onclick="revealStudyCard()"><div class="study-card-front">' + renderCardContent(card.front) + '</div>';
  if (window._studyRevealed) {
    html += '<div class="study-card-divider"></div><div class="study-card-back">' + renderCardContent(card.back) + '</div>';
  } else {
    html += '<div style="text-align:center;margin-top:20px;opacity:0.4;font-size:14px;">&#x1f441; ' + t('showAnswer') + '</div>';
  }
  html += '</div>';
  if (window._studyRevealed) {
    html += '<div class="study-mode-actions"><button class="btn fmt-action" style="background:#e74c3c;color:#fff;" onclick="studyResult(false)">' + t('dontKnow') + '</button><button class="btn fmt-action" style="background:#2ecc71;color:#fff;" onclick="studyResult(true)">' + t('know') + '</button></div>';
  }
  html += '</div></div></div>';
  container.innerHTML = html;
  updateBackBtn();
  loadStudyCardImages(container);
}
function revealStudyCard() { if (!window._studyRevealed) { window._studyRevealed = true; renderAll(); } }
function studyResult(knew) {
  var cards = window._studyCards;
  cards[window._studyIndex]._knew = knew;
  window._studyIndex++;
  window._studyRevealed = false;
  if (window._studyIndex >= cards.length) {
    window._studyComplete = true;
  }
  renderAll();
}
var _notifIdCounter = 1;
var _editStudyCardId = null;
var _editStudySetId = null;
var _studyCardImageTarget = null;
var _studyCardPreviewData = null;
function showAddStudyCard(setId) {
  _editStudySetId = setId;
  _editStudyCardId = null;
  cancelStudyCardImage();
  document.getElementById('studyCardFront').innerHTML = '';
  document.getElementById('studyCardBack').innerHTML = '';
  document.getElementById('studyCardTitle').textContent = t('addCard');
  showDialog('studyCardDialog');
  setTimeout(function(){ document.getElementById('studyCardFront').focus(); }, 100);
}
function editStudyCard(setId, cardId) {
  var set = state.studySets.find(function(s) { return s.id === setId; });
  if (!set) return;
  var card = set.cards.find(function(c) { return c.id === cardId; });
  if (!card) return;
  cancelStudyCardImage();
  _editStudySetId = setId;
  _editStudyCardId = cardId;
  document.getElementById('studyCardFront').innerHTML = card.front;
  document.getElementById('studyCardBack').innerHTML = card.back;
  document.getElementById('studyCardTitle').textContent = t('edit');
  showDialog('studyCardDialog');
  loadStudyCardImages(document.getElementById('studyCardDialog'));
  setTimeout(function(){ document.getElementById('studyCardFront').focus(); }, 100);
}
function saveStudyCard() {
  var front = document.getElementById('studyCardFront').innerHTML.trim();
  var back = document.getElementById('studyCardBack').innerHTML.trim();
  if (!front || !back) return;
  var set = state.studySets.find(function(s) { return s.id === _editStudySetId; });
  if (!set) return;
  if (_editStudyCardId) {
    var card = set.cards.find(function(c) { return c.id === _editStudyCardId; });
    if (card) { card.front = front; card.back = back; }
  } else {
    set.cards.push({ id: genId(), front: front, back: back });
  }
  closeDialog('studyCardDialog');
  save(); renderStudyContent();
  checkMilestones();
}
function triggerStudyCardImage(target) {
  _studyCardImageTarget = target;
  document.getElementById('studyCardImageInput').value = '';
  document.getElementById('studyCardImageInput').click();
}
function previewStudyCardImage(input) {
  if (!input.files || !input.files[0]) return;
  var file = input.files[0];
  if (file.size > 5 * 1024 * 1024) { alert(t('coverTooLarge')); return; }
  var reader = new FileReader();
  reader.onload = function(e) {
    _studyCardPreviewData = e.target.result;
    document.getElementById('studyCardPreviewImg').src = _studyCardPreviewData;
    document.getElementById('studyCardPreview').classList.remove('hidden');
  };
  reader.readAsDataURL(file);
}
function confirmStudyCardImage() {
  if (!_studyCardPreviewData) return;
  var data = _studyCardPreviewData;
  var id = _studyCardImageTarget === 'front' ? 'studyCardFront' : 'studyCardBack';
  var el = document.getElementById(id);
  if (!el) { cancelStudyCardImage(); return; }
  cancelStudyCardImage();
  var b64 = data.indexOf('base64,') >= 0 ? data.split('base64,')[1] : null;
  if (!b64) return;
  var ref = 'imagenes/sc-' + (_editStudySetId || 'set') + '-' + generateImageId() + '.webp';
  ImageManager.save(ref, b64).then(function() {
    var img = document.createElement('img');
    img.setAttribute('data-ref', ref);
    img.style.cssText = 'max-width:100%;max-height:200px;height:auto;object-fit:contain;border-radius:4px;margin:4px 0;display:block;';
    el.appendChild(img);
    el.focus();
    loadStudyCardImage(img, ref);
  }).catch(function(err) {
    console.error('Error saving study card image:', err);
  });
}
function cancelStudyCardImage() {
  _studyCardPreviewData = null;
  document.getElementById('studyCardPreview').classList.add('hidden');
  document.getElementById('studyCardPreviewImg').src = '';
  document.getElementById('studyCardImageInput').value = '';
}
function renderCardContent(text) {
  if (!text) return '';
  var parts = text.split(/(<img[^>]*>|<br\s*\/?>)/gi);
  return parts.map(function(part) {
    if (/^<img[^>]*>$/i.test(part)) return part.replace('<img ', '<img class="card-list-img" ');
    if (/^<br\s*\/?>$/i.test(part)) return part;
    return part;
  }).join('');
}

/* Carga una imagen de tarjeta almacenada por ref */
function loadStudyCardImage(img, ref) {
  if (!img || !ref) return;
  ImageManager.read(ref).then(function(base64) {
    if (!base64) { img.alt = 'Imagen no encontrada'; return; }
    img.src = 'data:' + ImageConverter.getMimeFromRef(ref) + ';base64,' + base64;
  }).catch(function(err) {
    console.error('Error loading study card image:', ref, err);
  });
}

/* Carga todas las imágenes data-ref de tarjetas en un contenedor */
function loadStudyCardImages(rootEl) {
  if (!rootEl) return;
  var imgs = rootEl.querySelectorAll('img[data-ref]:not([src])');
  [].forEach.call(imgs, function(img) {
    var ref = img.getAttribute('data-ref');
    loadStudyCardImage(img, ref);
  });
}
function deleteStudyCard(setId, cardId) {
  if (!confirm(t('del') + '?')) return;
  var set = state.studySets.find(function(s) { return s.id === setId; });
  if (!set) return;
  set.cards = set.cards.filter(function(c) { return c.id !== cardId; });
  save(); renderStudyContent();
}

function showMilestoneReminder() {
  var container = document.getElementById('milestoneButtons');
  if (container) {
    var url = 'https://cafecito.app/_aksk_';
    container.innerHTML = '<a href="' + url + '" target="_blank" rel="noopener" class="cafecito-btn">' + t('libro') + '</a><a href="' + url + '" target="_blank" rel="noopener" class="cafecito-btn">' + t('estante') + '</a><a href="' + url + '" target="_blank" rel="noopener" class="cafecito-btn">' + t('galeria') + '</a><a href="' + url + '" target="_blank" rel="noopener" class="cafecito-btn">' + t('salaBabel') + '</a>';
  }
  showDialog('milestoneDialog');
}
function checkMilestones() {
  function genArith(start, step, upTo) {
    var ms = [];
    for (var m = start; m <= upTo; m += step) ms.push(m);
    return ms;
  }
  function genPostit(upTo) {
    var ms = [];
    if (upTo >= 15) ms.push(15);
    if (upTo >= 25) ms.push(25);
    if (upTo >= 40) ms.push(40);
    if (upTo >= 50) ms.push(50);
    for (var m = 65; m <= upTo; m += 15) ms.push(m);
    return ms;
  }
  function genSet(upTo) {
    if (upTo < 2) return [];
    var ms = [2];
    var cur = 2, diff = 3;
    while (true) {
      cur += diff;
      if (cur > upTo) break;
      ms.push(cur);
      if (diff === 3) diff = 6;
      else diff++;
    }
    return ms;
  }
  var triggered = state._triggeredMilestones || [];
  var toCheck = [];
  genArith(5, 5, state._exportCount || 0).forEach(function(m) { toCheck.push({ id: 'export_' + m, count: state._exportCount || 0, threshold: m }); });
  genArith(5, 5, state.notes.length).forEach(function(m) { toCheck.push({ id: 'note_' + m, count: state.notes.length, threshold: m }); });
  (function() {
    var total = 0;
    state.boards.forEach(function(b) { total += (b.postits || []).length; });
    genPostit(total).forEach(function(m) { toCheck.push({ id: 'postit_' + m, count: total, threshold: m }); });
  })();
  genSet(state.studySets.length).forEach(function(m) { toCheck.push({ id: 'set_' + m, count: state.studySets.length, threshold: m }); });
  (function() {
    var totalCards = 0;
    state.studySets.forEach(function(s) { totalCards += (s.cards || []).length; });
    genArith(10, 15, totalCards).forEach(function(m) { toCheck.push({ id: 'card_' + m, count: totalCards, threshold: m }); });
  })();
  for (var i = 0; i < toCheck.length; i++) {
    var item = toCheck[i];
    if (item.count >= item.threshold && triggered.indexOf(item.id) === -1) {
      triggered.push(item.id);
      state._triggeredMilestones = triggered;
      save();
      setTimeout(function() { showMilestoneReminder(); }, 500);
      break;
    }
  }
}
function trackExport() {
  state._exportCount = (state._exportCount || 0) + 1;
  save();
  checkMilestones();
}
function renderCafecitoContent() {
  var container = document.getElementById('cafecitoContent');
  var url = 'https://cafecito.app/_aksk_';
  container.innerHTML = '<div class="cafecito-page"><div class="cafecito-icon"><img src="Isotipo.png" alt="Isotipo" class="cafecito-img"></div><h2>Expandir la Biblioteca</h2><p class="cafecito-desc">' + t('cafecitoDesc') + '</p><div class="cafecito-buttons"><a href="' + url + '" target="_blank" rel="noopener" class="cafecito-btn">' + t('libro') + ' \u2615 1</a><a href="' + url + '" target="_blank" rel="noopener" class="cafecito-btn">' + t('estante') + ' \u2615 10</a><a href="' + url + '" target="_blank" rel="noopener" class="cafecito-btn">' + t('galeria') + ' \u2615 20</a><a href="' + url + '" target="_blank" rel="noopener" class="cafecito-btn">' + t('salaBabel') + ' \u2615 50</a></div></div>';
}
function renderTrashContent() {
  var container = document.getElementById('trashContent');
  var typeIcons = { note: '\uD83D\uDCC4', board: '\uD83D\uDCCB', studySet: '\uD83C\uDCC7', registro: '📊' };
  var typeLabels = { note: t('trashTypeNote'), board: t('trashTypeBoard'), studySet: t('trashTypeStudySet'), registro: t('trashTypeRegistro') };
  var html = '<div class="selection-view"><div class="selection-header"><h2>&#x1f5d1; ' + t('trash') + '</h2></div>';
  html += '<div style="font-size:12px;color:var(--text-muted);padding:12px 20px;border-bottom:1px solid var(--border);">' + t('trashSubtitle') + '</div>';
  if (state.trash.length === 0) {
    html += '<div class="trash-empty">' + t('trashEmpty') + '</div>';
  } else {
    html += '<div class="trash-list">';
    state.trash.forEach(function(item, i) {
      var title = item.data.name || item.data.title || '(sin t\u00edtulo)';
      var daysLeft = Math.max(0, 30 - Math.floor((Date.now() - item.deletedAt) / (24*60*60*1000)));
      html += '<div class="trash-item" style="display:flex;align-items:center;justify-content:space-between;padding:12px 20px;border-bottom:1px solid var(--border);">' +
        '<div class="trash-item-info" style="flex:1;min-width:0;">' +
        '<div class="trash-item-title" style="font-size:14px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + (typeIcons[item.type] || '') + ' ' + escapeHtml(title) + '</div>' +
        '<div class="trash-item-days" style="font-size:11px;color:var(--text-muted);margin-top:2px;">' + (typeLabels[item.type] || '') + ' &middot; ' + (daysLeft > 0 ? t('trashDaysLeft') + daysLeft + t('trashDaysUnit') : t('trashDeletedSoon')) + '</div></div>' +
        '<div class="trash-item-actions" style="display:flex;gap:6px;flex-shrink:0;margin-left:12px;">' +
        '<button class="btn" onclick="restoreFromTrash(' + i + ')">' + t('restore') + '</button>' +
        '<button class="btn" onclick="if(confirm(\'' + t('confirmDeletePermanent') + '\'))deleteFromTrashPermanently(' + i + ')">' + t('deletePermanent') + '</button></div></div>';
    });
    html += '</div>';
  }
  html += '</div>';
  container.innerHTML = html;
}

function renderNoteContent() {
  var container = document.getElementById('noteContent');
  var note = state.notes.find(function(n) { return n.id === state.activeNoteId; });
  if (note) { /* handled below */ } else if (state.activeFolderId != null) {
    // Vista dentro de carpeta
    var folder = getFolderById(state.activeFolderId);
    if(!folder){ state.activeFolderId=null; return renderNoteContent(); }
    ensureRootOrder();
    var notesInFolder = state.notes.filter(function(n){ return !n.diary && n.folderId===folder.id; });
    // sort by state.notes order
    notesInFolder.sort(function(a,b){
      var ia=state.notes.indexOf(a), ib=state.notes.indexOf(b);
      return ia-ib;
    });
    var html='<div class="selection-view"><div class="selection-grid" data-folder-grid="'+folder.id+'">';
    if(notesInFolder.length===0){
      html+='<div class="folder-empty">'+t('emptyFolderHint')+'</div>';
    } else {
      var pendingCovers=[];
      notesInFolder.forEach(function(n){
        var locked = n.pwdHash && !unlockedIds['n'+n.id];
        var lock = locked ? '<span class="card-lock">&#x1f512;</span>' : '';
        var fav = n.favorite ? '<span class="card-fav">&#x2605;</span>' : '';
        var coverUrl = getCoverUrl(n);
        var coverStyle = coverUrl ? ' style="background-image:url('+coverUrl+');background-size:cover;background-position:center;"' : '';
        html+='<div class="card'+(coverUrl?' card-has-cover':'')+'" data-note-id="'+n.id+'" onclick="selectNote('+n.id+')">'+
          '<span class="card-drag-handle" onclick="event.stopPropagation()"><span class="drag-icon">&#x2630;</span></span>'+lock+fav+
          '<span class="card-date">'+fmtDate(n.createdAt)+'</span>'+
          '<div class="card-title">'+escapeHtml(n.title)+'</div>'+
          '<div class="card-preview"'+coverStyle+'>'+(coverUrl?'':getNotePreview(n))+'</div></div>';
        if(n.cover && n.cover.indexOf('ref:')===0 && !_coverUrls[n.cover.substring(4)]) pendingCovers.push(n);
      });
      var gridContainer = container;
      pendingCovers.forEach(function(n){
        loadCoverUrl(n).then(function(url){
          if(!url) return;
          var card=gridContainer.querySelector('.card[data-note-id="'+n.id+'"]');
          if(card){ var preview=card.querySelector('.card-preview'); if(preview){ preview.style.backgroundImage='url('+url+')'; preview.innerHTML=''; } card.classList.add('card-has-cover'); }
        });
      });
    }
    html+='</div></div>';
    var savedGridTop=document.querySelector('.selection-grid');
    var savedGridScroll=savedGridTop?savedGridTop.scrollTop:0;
    container.innerHTML=html;
    updateBackBtn();
    // enable long-press on notes inside folder for "Sacar" and also drag handle
    if(savedGridScroll>0){ var ng=document.querySelector('.selection-grid'); if(ng) ng.scrollTop=savedGridScroll; }
    return;
  } else if (!note) {
    ensureRootOrder();
    var html = '<div class="selection-view"><div class="selection-header"><h2>' + t('notes') + '</h2></div><div class="selection-grid" id="rootGrid">';
    var hasItems = state.rootOrder.length>0;
    // also need to consider root notes not in rootOrder? ensureRootOrder covers
    if (!hasItems) {
      // check if there are notes but not in rootOrder? Could be empty folders too
      if(state.folders.length===0 && state.notes.filter(function(n){return !n.diary && n.folderId==null;}).length===0){
        html += '<div class="selection-empty">' + t('noNotes') + '</div>';
      } else if(state.folders.length===0){
        // fallback to notes
        var regularNotes = state.notes.filter(function(n) { return !n.diary && n.folderId==null; });
        if(regularNotes.length===0) html += '<div class="selection-empty">' + t('noNotes') + '</div>';
        else {
          var pendingCovers = [];
          regularNotes.forEach(function(n) {
            var locked = n.pwdHash && !unlockedIds['n' + n.id];
            var lock = locked ? '<span class="card-lock">&#x1f512;</span>' : '';
            var fav = n.favorite ? '<span class="card-fav">&#x2605;</span>' : '';
            var coverUrl = getCoverUrl(n);
            var coverStyle = coverUrl ? ' style="background-image:url(' + coverUrl + ');background-size:cover;background-position:center;"' : '';
            html += '<div class="card' + (coverUrl ? ' card-has-cover' : '') + '" data-note-id="' + n.id + '" onclick="selectNote(' + n.id + ')">' +
              '<span class="card-drag-handle" onclick="event.stopPropagation()"><span class="drag-icon">&#x2630;</span></span>' +
              lock + fav +
              '<span class="card-date">' + fmtDate(n.createdAt) + '</span>' +
              '<div class="card-title">' + escapeHtml(n.title) + '</div>' +
              '<div class="card-preview"' + coverStyle + '>' + (coverUrl ? '' : getNotePreview(n)) + '</div></div>';
            if (n.cover && n.cover.indexOf('ref:') === 0 && !_coverUrls[n.cover.substring(4)]) pendingCovers.push(n);
          });
          var gridContainer = container;
          pendingCovers.forEach(function(n) {
            loadCoverUrl(n).then(function(url) {
              if (!url) return;
              var card = gridContainer.querySelector('.card[data-note-id="' + n.id + '"]');
              if (card) {
                var preview = card.querySelector('.card-preview');
                if (preview) {
                  preview.style.backgroundImage = 'url(' + url + ')';
                  preview.innerHTML = '';
                }
                card.classList.add('card-has-cover');
              }
            });
          });
        }
      } else {
        hasItems = true;
      }
    }
    if(hasItems){
      var pendingCovers2=[];
      state.rootOrder.forEach(function(entry){
        if(entry.type==='note'){
          var n=state.notes.find(function(x){return x.id===entry.id && !x.diary && x.folderId==null;});
          if(!n) return;
          var locked = n.pwdHash && !unlockedIds['n' + n.id];
          var lock = locked ? '<span class="card-lock">&#x1f512;</span>' : '';
          var fav = n.favorite ? '<span class="card-fav">&#x2605;</span>' : '';
          var coverUrl = getCoverUrl(n);
          var coverStyle = coverUrl ? ' style="background-image:url(' + coverUrl + ');background-size:cover;background-position:center;"' : '';
          html += '<div class="card' + (coverUrl ? ' card-has-cover' : '') + '" data-note-id="' + n.id + '" onclick="selectNote(' + n.id + ')">' +
            '<span class="card-drag-handle" onclick="event.stopPropagation()"><span class="drag-icon">&#x2630;</span></span>' +
            lock + fav +
            '<span class="card-date">' + fmtDate(n.createdAt) + '</span>' +
            '<div class="card-title">' + escapeHtml(n.title) + '</div>' +
            '<div class="card-preview"' + coverStyle + '>' + (coverUrl ? '' : getNotePreview(n)) + '</div></div>';
          if (n.cover && n.cover.indexOf('ref:') === 0 && !_coverUrls[n.cover.substring(4)]) pendingCovers2.push(n);
        } else if(entry.type==='folder'){
          var f=getFolderById(entry.id); if(!f) return;
          var lockedF = f.pwdHash && !unlockedIds['f'+f.id];
          var lockF = lockedF ? '<span class="card-lock">&#x1f512;</span>' : '';
          var cnt=countNotesInFolder(f.id);
          html += '<div class="card card-folder" data-folder-id="' + f.id + '" onclick="openFolder(' + f.id + ')">' +
            '<span class="card-drag-handle" onclick="event.stopPropagation()"><span class="drag-icon">&#x2630;</span></span>' +
            lockF +
            '<div class="card-folder-icon">&#x1f4c1;</div>' +
            '<div class="card-title">' + escapeHtml(f.name) + '</div>' +
            '<div class="card-preview">' + cnt + ' ' + (cnt===1? t('countNote'): t('countNotes')) + (f.pwdHash? ' &middot; &#x1f512;':'') + '</div></div>';
        }
      });
      var gridContainer2 = container;
      pendingCovers2.forEach(function(n) {
        loadCoverUrl(n).then(function(url) {
          if (!url) return;
          var card = gridContainer2.querySelector('.card[data-note-id="' + n.id + '"]');
          if (card) {
            var preview = card.querySelector('.card-preview');
            if (preview) {
              preview.style.backgroundImage = 'url(' + url + ')';
              preview.innerHTML = '';
            }
            card.classList.add('card-has-cover');
          }
        });
      });
    }
    html += '</div></div>';
    var savedGridTop = document.querySelector('.selection-grid');
    var savedGridScroll = savedGridTop ? savedGridTop.scrollTop : 0;
    container.innerHTML = html;
    updateBackBtn();
    if (savedGridScroll > 0) { var ng = document.querySelector('.selection-grid'); if (ng) ng.scrollTop = savedGridScroll; }
    return;
  }
  updateBackBtn();
  var html = '';
  if (note.cover) {
    if (note.cover.indexOf('ref:') === 0) {
      html += '<div class="note-cover" data-cover-ref="' + escapeHtml(note.cover) + '"></div>';
    } else {
      html += '<div class="note-cover" style="background-image:url(' + note.cover + ');"></div>';
    }
  }
  html += '<div class="items-area" data-note-id="' + note.id + '">';
  if (note.items.length === 0) {
    html += '<div style="color:#555;font-size:13px;padding:20px;text-align:center;">' + t('addItemsPrompt') + '</div>';
  } else {
    note.items.forEach(function(item) {
      if (item.type === 'image') {
        html += '<div class="list-item image-item" data-id="' + item.id + '">';
        html += '<div class="image-container">';
        html += '<img src="" data-ref="' + escapeHtml(item.src) + '" alt="" />';
        html += '</div>';
        html += '<div contenteditable="true" class="image-caption" data-placeholder="A\u00f1adir pie de foto..." oninput="updateImageCaption(' + note.id + ', ' + item.id + ', this.innerHTML)">' + (item.caption || '') + '</div>';
        html += '<span class="item-actions">';
        html += '<button class="btn btn-sm btn-icon" onclick="deleteItem(' + note.id + ', ' + item.id + ')">&times;</button>';
        html += '</span></div>';
      } else if (item.type === 'audio') {
        html += '<div class="list-item image-item item-audio-block" data-id="' + item.id + '">';
        html += '<div class="audio-player-wrap" data-ref="' + escapeHtml(item.ref) + '"></div>';
        html += '<span class="item-actions">';
        html += '<button class="btn btn-sm btn-icon" onclick="deleteItem(' + note.id + ', ' + item.id + ')">&times;</button>';
        html += '</span></div>';
      } else if (item.type === 'video') {
        html += '<div class="list-item image-item item-video-block" data-id="' + item.id + '">';
        html += '<video class="note-video" data-ref="' + escapeHtml(item.ref) + '" controls playsinline style="max-width:100%;border-radius:6px;"></video>';
        html += '<span class="item-actions">';
        html += '<button class="btn btn-sm btn-icon" onclick="deleteItem(' + note.id + ', ' + item.id + ')">&times;</button>';
        html += '</span></div>';
      } else if (item.type === 'table') {
        html += '<div class="list-item" data-id="' + item.id + '" style="position:relative;">';
        html += renderTableData(item, note.id);
        html += '<span class="item-actions" style="position:absolute;top:4px;right:4px;">';
        html += '<button class="btn btn-sm" onclick="deleteItem(' + note.id + ', ' + item.id + ')">&times;</button>';
        html += '</span></div>';
      } else {
        var isText = item.type === 'text';
        html += '<div class="list-item' + (isText ? ' text' : '') + '" data-id="' + item.id + '" data-level="' + item.level + '">';
        if (!isText) html += '<span class="drag-handle">&#x2630;</span>';
        if (!isText) html += '<input type="checkbox" class="item-check"' + (item.checked ? ' checked' : '') + ' onchange="toggleItem(' + note.id + ', ' + item.id + ')" />';
         html += '<div contenteditable="true" class="item-text' + (item.checked ? ' checked' : '') + '" data-placeholder="' + (isText ? t('textPlaceholder') : t('itemPlaceholder')) + '" oninput="updateItemText(' + note.id + ', ' + item.id + ', this.innerHTML);computeOnEquals(this,' + note.id + ',' + item.id + ')" onfocus="activeItemId=' + item.id + '" onblur="if (activeItemId==' + item.id + ') { activeItemId=null; }">' + renderLatexInHtml(parseRegistrosForRender(parseDiaryVariablesForRender(parseNoteLinks(item.text || '')))) + '</div>';
        html += '<span class="item-actions">';
        if (!isText) html += '<button class="btn btn-sm btn-icon" onclick="indentItem(' + note.id + ', ' + item.id + ')">&rarr;</button>';
        if (!isText) html += '<button class="btn btn-sm btn-icon" onclick="outdentItem(' + note.id + ', ' + item.id + ')">&larr;</button>';
        html += '<button class="btn btn-sm btn-icon" onclick="deleteItem(' + note.id + ', ' + item.id + ')">&times;</button>';
        html += '</span></div>';
      }
    });
  }
  html += '</div>';
  /* Eventos y tareas integrados en la nota */
  var hasEvents = note.events && note.events.length > 0;
  var hasTasks = note.tasks && note.tasks.length > 0;
  if (hasEvents || hasTasks) {
    html += '<div class="reminder-section">';
    if (hasEvents) {
      html += '<div class="reminder-group-label">' + t('event') + 's</div>';
      note.events.forEach(function(ev) {
        html += '<div class="reminder-item reminder-event" data-uuid="' + ev.uuid + '">';
        html += '<span class="reminder-icon">&#x1f4c5;</span>';
        html += '<span class="reminder-title">' + escapeHtml(ev.title) + '</span>';
        if (ev.time) html += '<span class="reminder-time">' + escapeHtml(ev.time) + '</span>';
        html += '<span class="item-actions">';
        html += '<button class="btn btn-sm btn-icon" onclick="deleteReminder(' + note.id + ',\'' + ev.uuid + '\')">&times;</button>';
        html += '</span></div>';
      });
    }
    if (hasTasks) {
      html += '<div class="reminder-group-label">' + t('task') + 's</div>';
      note.tasks.forEach(function(tk) {
        var checked = tk.status === 'completed' ? ' checked' : '';
        html += '<div class="reminder-item reminder-task" data-uuid="' + tk.uuid + '">';
        html += '<input type="checkbox" class="reminder-check"' + checked + ' onchange="toggleTaskStatus(' + note.id + ',\'' + tk.uuid + '\')" />';
        html += '<span class="reminder-title' + (checked ? ' reminder-done' : '') + '">' + escapeHtml(tk.title) + '</span>';
        if (tk.time) html += '<span class="reminder-time">' + escapeHtml(tk.time) + '</span>';
        html += '<span class="item-actions">';
        html += '<button class="btn btn-sm btn-icon" onclick="deleteReminder(' + note.id + ',\'' + tk.uuid + '\')">&times;</button>';
        html += '</span></div>';
      });
    }
    html += '<button class="btn btn-sm test-notif-btn" onclick="sendTestNotification()">' + t('testNotif') + '</button>';
    html += '</div>';
  }
  /* Replicados de otras notas del diario por repeticion */
  if (note.diary) {
    var todayParts = note.title.split('-').map(function(x){return parseInt(x,10);});
    if (todayParts.length === 3) {
      var targetDate = new Date(todayParts[2], todayParts[1] - 1, todayParts[0]);
      var replicatedHtml = '';
      state.notes.forEach(function(otherNote) {
        if (!otherNote.diary || otherNote.id === note.id) return;
        var all = (otherNote.events || []).concat(otherNote.tasks || []);
        all.forEach(function(e) {
          if (!e.repetition || e.repetition === 'none') return;
          if (!repetitionMatchesToday(e, targetDate)) return;
          replicatedHtml += '<div class="reminder-item reminder-replicated" data-uuid="' + e.uuid + '" data-origin="' + otherNote.id + '" onclick="openNoteById(' + otherNote.id + ')" title="' + t('diary') + ': ' + escapeHtml(otherNote.title) + '">';
          replicatedHtml += '<span class="reminder-replicated-icon">&#x1f517;</span>';
          replicatedHtml += '<span class="reminder-title reminder-replicated-title">' + escapeHtml(e.title) + '</span>';
          replicatedHtml += '</div>';
        });
      });
      if (replicatedHtml) {
        html += '<div class="reminder-section">';
        html += '<div class="reminder-group-label">' + t('diarySection') + '</div>';
        html += replicatedHtml;
        html += '</div>';
      }
    }
  }
  html += '<div class="fmt-bar">';
  html += '<button class="fmt-btn" id="fmtBold" onmousedown="event.preventDefault()" onclick="formatBold()" title="' + t('bold') + '"><b>B</b></button>';
  html += '<button class="fmt-btn" id="fmtItalic" onmousedown="event.preventDefault()" onclick="formatItalic()" title="' + t('italic') + '"><i>I</i></button>';
  html += '<button class="fmt-btn" id="fmtUnderline" onmousedown="event.preventDefault()" onclick="formatUnderline()" title="' + t('underline') + '"><u>U</u></button>';
  html += '<div style="display:inline-block;">';
  html += '<button class="fmt-btn hl-toggle" onclick="applyHighlight()" title="' + t('highlight') + '"><span style="background:' + _hlColor + ';padding:0 2px;font-weight:bold;">A</span></button>';
  html += '<div id="hlPalette" class="hidden" style="position:fixed;z-index:10000;background:var(--surface);border:1px solid var(--border);border-radius:6px;padding:4px;display:flex;gap:3px;">';
  html += '<span class="hl-color" style="background:#ffff00;" onmousedown="event.preventDefault()" onclick="selectHighlightColor(\'#ffff00\');event.stopPropagation();" title="Yellow"></span>';
  html += '<span class="hl-color" style="background:#87ceeb;" onmousedown="event.preventDefault()" onclick="selectHighlightColor(\'#87ceeb\');event.stopPropagation();" title="Celeste"></span>';
  html += '<span class="hl-color" style="background:#ffb6c1;" onmousedown="event.preventDefault()" onclick="selectHighlightColor(\'#ffb6c1\');event.stopPropagation();" title="Pink"></span>';
  html += '<span class="hl-color" style="background:#ffa500;" onmousedown="event.preventDefault()" onclick="selectHighlightColor(\'#ffa500\');event.stopPropagation();" title="Orange"></span>';
  html += '<span class="hl-color" style="background:#90ee90;" onmousedown="event.preventDefault()" onclick="selectHighlightColor(\'#90ee90\');event.stopPropagation();" title="Green"></span>';
  html += '<span class="hl-color" style="background:transparent;border:1px dashed var(--text-muted);display:inline-flex;align-items:center;justify-content:center;font-size:14px;" onmousedown="event.preventDefault()" onclick="selectRemoveHighlight();event.stopPropagation();" title="Remove highlight">&#x2716;</span>';
  html += '</div></div>';
  html += '<button class="fmt-btn" onclick="formatBulletList()" title="' + t('bulletList') + '">&#x2022;</button>';
  html += '<button class="fmt-btn" onclick="formatNumberedList()" title="' + t('numberedList') + '">1.</button>';
  html += '<span style="width:1px;height:20px;background:var(--border);margin:0 6px;"></span>';
  html += '<button class="fmt-btn fmt-align-btn" onclick="cycleAlignment()" title="' + t('alignLeft') + '">\u2194</button>';
  html += '<span style="width:1px;height:20px;background:var(--border);margin:0 6px;"></span>';
  html += '<button class="btn fmt-action" onclick="addItem()" title="' + t('addItem') + '">[&#x2713;]</button>';
  html += '<button class="btn fmt-action" onclick="addTextItem()" title="' + t('addText') + '"><b>T</b></button>';
  html += '<button class="btn fmt-action" onclick="triggerInsertImage()" title="' + t('insertImage') + '">&#x1f304;</button>';
  html += '<button class="btn fmt-action" onclick="document.getElementById(\'audioInput\').click()" title="' + t('insertAudio') + '">&#x1F3A4; ' + t('insertAudio') + '</button>';
  html += '<button class="btn fmt-action" onclick="document.getElementById(\'videoInput\').click()" title="' + t('insertVideo') + '">&#x1F3AC; ' + t('insertVideo') + '</button>';
  html += '<button class="btn fmt-action" onclick="showTableDialog()" title="' + t('insertTable') + '">&#x229E;</button>';
  // Botón Recuérdame eliminado - reemplazado por Hábitos
  html += '<button class="btn fmt-action" onclick="insertLatexBlock()" title="' + t('insertEquation') + '" style="font-weight:bold;font-size:15px;">&#x2211;</button>';
  html += '<span style="flex:1"></span>';
  html += '<div style="position:relative;display:inline-block;">';
  html += '<button class="btn fmt-action exp-toggle" onclick="toggleExportPalette()" title="' + t('export') + '">' + t('export') + '</button>';
  html += '<div id="exportPalette" class="hidden" style="position:fixed;z-index:10000;background:var(--surface);border:1px solid var(--border);border-radius:6px;padding:4px;display:flex;flex-direction:column;gap:2px;">';
  html += '<button class="export-opt" onclick="exportCurrentNoteToPdf();event.stopPropagation();">PDF</button>';
  html += '<button class="export-opt" onclick="exportCurrentNoteToTxt();event.stopPropagation();">TXT</button>';
  html += '<button class="export-opt" onclick="exportCurrentNoteToDoc();event.stopPropagation();">DOC</button>';
  html += '</div></div>';
  html += '</div>';
  var savedScrollTop = 0, savedActiveId = activeItemId;
  var oldArea = document.querySelector('.items-area');
  if (oldArea) savedScrollTop = oldArea.scrollTop;
  container.innerHTML = html;
  if (savedScrollTop > 0) { var newArea = document.querySelector('.items-area'); if (newArea) newArea.scrollTop = savedScrollTop; }
  if (savedActiveId !== null && savedActiveId !== undefined) {
    var targetEl = document.querySelector('.list-item[data-id="' + savedActiveId + '"] .item-text[contenteditable]');
    if (targetEl) { targetEl.focus(); placeCaretAtEnd(targetEl); }
  }
  updateTableFab();
  loadNoteImages();
  loadNoteAudios();
  loadNoteVideos();
  loadNoteCover();
}

/* Carga los reproductores de video en las notas */
function loadNoteVideos() {
  var vids = document.querySelectorAll('.note-video[data-ref]');
  [].forEach.call(vids, function(v) {
    var ref = v.getAttribute('data-ref');
    v.removeAttribute('data-ref');
    if (_mediaBlobUrls[ref]) { v.src = _mediaBlobUrls[ref]; return; }
    ImageManager.read(ref).then(function(base64) {
      if (!base64) return;
      var mime = ImageConverter.getMimeFromRef(ref);
      var blob = _base64ToBlob(base64, mime);
      var url = URL.createObjectURL(blob);
      _mediaBlobUrls[ref] = url;
      v.src = url;
    });
  });
}

/* Carga la portada de la nota (ref) de forma asíncrona */
function loadNoteCover() {
  var coverEl = document.querySelector('.note-cover[data-cover-ref]');
  if (!coverEl) return;
  var ref = coverEl.getAttribute('data-cover-ref');
  coverEl.removeAttribute('data-cover-ref');
  if (ref.indexOf('ref:') !== 0) return;
  loadCoverUrl(state.notes.find(function(n) { return n.id === state.activeNoteId; })).then(function(url) {
    if (url) coverEl.style.backgroundImage = 'url(' + url + ')';
  });
}

/* Carga los reproductores de audio en las notas */
function loadNoteAudios() {
  var wrappers = document.querySelectorAll('.audio-player-wrap[data-ref]');
  [].forEach.call(wrappers, function(wrapper) {
    var ref = wrapper.getAttribute('data-ref');
    if (!ref) return;
    wrapper.removeAttribute('data-ref');
    createAudioPlayer(ref, wrapper, {});
  });
}

function showNewBoardDialog() {
  document.getElementById('newBoardPwd').value = '';
  showDialog('newBoardDialog');
  setTimeout(function(){ document.getElementById('newBoardName').focus(); }, 100);
}

function createBoard() {
  var name = document.getElementById('newBoardName').value.trim() || t('newBoardLabel');
  var pwd = document.getElementById('newBoardPwd').value;
  var board = { id: genId(), name: name, postits: [], connections: [], boardBg: state.defaultBoardBg, pwdHash: hashPwd(pwd), createdAt: Date.now() };
  state.boards.push(board);
  state.activeBoardId = board.id;
  if (pwd) unlockedIds['b' + board.id] = true;
  closeDialog('newBoardDialog');
  document.getElementById('newBoardName').value = '';
  document.getElementById('newBoardPwd').value = '';
  save();
  renderAll();
}

function setBoardBg(bg) {
  var board = state.boards.find(function(b) { return b.id === state.activeBoardId; });
  if (!board) return;
  board.boardBg = bg;
  save();
  renderBoardContent();
}

function addPostit(color) {
  var board = state.boards.find(function(b) { return b.id === state.activeBoardId; });
  if (!board) return;
  var wrap = document.querySelector('.board-canvas-wrap');
  var vx = wrap ? wrap.scrollLeft : 0;
  var vy = wrap ? wrap.scrollTop : 0;
  var ox = (vx + 50 + Math.round(Math.random() * 200)) / boardZoom;
  var oy = (vy + 50 + Math.round(Math.random() * 150)) / boardZoom;
  board.postits.push({ id: genId(), text: '', color: color || 'yellow', x: ox, y: oy, w: 180, h: 180 });
  save();
  checkMilestones();
  renderBoardContent();
}

function deletePostit(boardId, postitId) {
  var board = state.boards.find(function(b) { return b.id === boardId; });
  if (!board) return;
  board.postits = board.postits.filter(function(p) { return p.id !== postitId; });
  board.connections = board.connections.filter(function(c) { return c.from !== postitId && c.to !== postitId; });
  save();
  renderBoardContent();
}

function updatePostitText(boardId, postitId, text) {
  var board = state.boards.find(function(b) { return b.id === boardId; });
  if (!board) return;
  var p = board.postits.find(function(p) { return p.id === postitId; });
  if (p) { p.text = unparseNoteLinks(unrenderLatexInHtml(text || '')); save(); }
}

function cancelConnect() {
  if (!connectState || !connectState.active) return;
  connectState.active = false;
  connectState.fromId = null;
  Array.prototype.forEach.call(document.querySelectorAll('.postit, .board-element'), function(el) { el.classList.remove('connecting'); });
  var wrap = document.querySelector('.board-canvas-wrap');
  if (wrap) wrap.classList.remove('connecting-mode');
  setStatus('');
}

function startConnection(elementId) {
  if (!connectState || !connectState.active) return;
  if (connectState.boardId !== state.activeBoardId) return;
  var board = state.boards.find(function(b) { return b.id === state.activeBoardId; });
  if (!board) return;
  if (!connectState.fromId) {
    connectState.fromId = elementId;
    var el = document.querySelector('[data-id="' + elementId + '"]');
    if (el) el.classList.add('connecting');
    setStatus(t('clickDestiny'));
  } else if (connectState.fromId !== elementId) {
    var exists = board.connections.some(function(c) {
      return (c.from === connectState.fromId && c.to === elementId) ||
             (c.from === elementId && c.to === connectState.fromId);
    });
    if (!exists) {
      board.connections.push({ from: connectState.fromId, to: elementId });
      save();
      setStatus(t('connectionCreated'));
    } else {
      setStatus(t('connectionExists'));
    }
    Array.prototype.forEach.call(document.querySelectorAll('.postit, .board-element'), function(el) { el.classList.remove('connecting'); });
    var w = document.querySelector('.board-canvas-wrap');
    if (w) w.classList.remove('connecting-mode');
    connectState.fromId = null;
    connectState.active = false;
    renderBoardContent();
  } else {
    setStatus(t('chooseOther'));
  }
}

function showContextMenu(x, y, items) {
  var menu = document.getElementById('contextMenu');
  menu.innerHTML = '';
  items.forEach(function(item) {
    var div = document.createElement('div');
    div.className = 'context-item';
    div.textContent = item.label;
    (function(action) { div.onclick = function(e) { e.stopPropagation(); hideContextMenu(); action(); }; })(item.action);
    menu.appendChild(div);
  });
  menu.style.left = x + 'px';
  menu.style.top = y + 'px';
  menu.classList.remove('hidden');
  var mw = menu.offsetWidth || 140;
  if (x + mw > window.innerWidth - 8) {
    menu.style.left = Math.max(8, x - mw) + 'px';
  }
  var overlay = document.getElementById('menuOverlay');
  if (overlay) overlay.classList.add('open');
}

function hideContextMenu() {
  var menu = document.getElementById('contextMenu');
  if (menu) menu.classList.add('hidden');
  _fabLongPressed = false;
  var overlay = document.getElementById('menuOverlay');
  var sidebar = document.getElementById('menuSidebar');
  var menuOpen = sidebar && sidebar.classList.contains('open');
  if (overlay && !menuOpen) overlay.classList.remove('open');
}

function contextConnect(elementId) {
  if (!elementId) return;
  var board = state.boards.find(function(b) { return b.id === state.activeBoardId; });
  if (!board) { setStatus(t('needPostits')); return; }
  var totalCount = (board.postits || []).length + (board.elements || []).length;
  if (totalCount < 2) { setStatus(t('needPostits')); return; }
  var el = document.querySelector('[data-id="' + elementId + '"]');
  if (el) el.classList.add('connecting');
  connectState = { active: true, fromId: elementId, boardId: state.activeBoardId };
  var wrap = document.querySelector('.board-canvas-wrap');
  if (wrap) wrap.classList.add('connecting-mode');
  setStatus(t('clickDestiny'));
}

function toggleFavorite(noteId) {
  var note = state.notes.find(function(n) { return n.id === noteId; });
  if (!note) return;
  note.favorite = !note.favorite;
  save();
  renderNoteContent();
}

function exportNoteToPdf(noteId) {
  var note = state.notes.find(function(n) { return n.id === noteId; });
  if (!note) return;
  trackExport();
  showToast(t('processingExport'));
  if (!window.PDFLib) {
    setStatus('Error: librería PDF no disponible');
    return;
  }
  setStatus('PDF: 1/5 Cargando fuente...');
  var fontBuf;
  fetch('lib/NotoSans.ttf')
    .then(function(r) {
      if (!r.ok) throw new Error('Font not found');
      return r.arrayBuffer();
    })
    .then(function(buf) {
      fontBuf = buf;
      setStatus('PDF: 2/5 Creando documento...');
      return PDFLib.PDFDocument.create();
    })
    .catch(function() {
      fontBuf = null;
      setStatus('PDF: 2/5 Usando Helvetica (fallback)...');
      return PDFLib.PDFDocument.create();
    })
    .then(function(pdfDoc) {
      pdfDoc.registerFontkit(fontkit);
      var embedPromise = fontBuf
        ? pdfDoc.embedFont(fontBuf)
        : pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
      return embedPromise.then(function(font) {
        setStatus('PDF: 3/5 Dibujando contenido...');
        var page = pdfDoc.addPage([595.28, 841.89]);
        var margin = 50;
        var y = 800;
        var processPromise = note.items.reduce(function(promise, item) {
          return promise.then(function() {
            if (item.type === 'image') {
              return ImageManager.read(item.src).then(function(base64) {
                if (!base64) { y -= 18; return; }
                return ImageConverter.webpToPng(base64, item.width, item.height).then(function(pngBase64) {
                  var pngBytes = ImageConverter.base64ToBytes(pngBase64);
                  return pdfDoc.embedPng(pngBytes).then(function(pngImage) {
                    if (y < 50) { page = pdfDoc.addPage([595.28, 841.89]); y = 800; }
                    var maxWidth = 495.28;
                    var drawW = item.width || 200;
                    var drawH = item.height || 150;
                    var scale = Math.min(1, maxWidth / drawW);
                    drawW = Math.round(drawW * scale);
                    drawH = Math.round(drawH * scale);
                    if (drawH > y - 50) { var aspect = drawW / drawH; drawH = y - 50; drawW = Math.round(drawH * aspect); }
                    page.drawImage(pngImage, { x: margin, y: y - drawH, width: drawW, height: drawH });
                    y -= (drawH + 12);
                  });
                });
              }).catch(function(err) {
                console.error('Image error in PDF:', err);
                y -= 18;
              });
            }
            var rawText = (item.text || '').trim();
            if (!rawText) return;
            if (y < 50) { page = pdfDoc.addPage([595.28, 841.89]); y = 800; }
            var indent = margin + (item.level || 0) * 28;
            if (rawText.indexOf('$') >= 0) {
              /* Contains LaTeX - render to image */
              var displayHtml = renderLatexInHtml(parseNoteLinks(rawText));
              return renderTextToCanvas(displayHtml, 495.28).then(function(result) {
                var pngBytes = ImageConverter.base64ToBytes(result.base64);
                return pdfDoc.embedPng(pngBytes).then(function(pngImage) {
                  if (y < 50) { page = pdfDoc.addPage([595.28, 841.89]); y = 800; }
                  var drawW = Math.min(result.width, 495.28);
                  var drawH = result.height * (drawW / result.width);
                  if (drawH > y - 50) { drawH = y - 50; drawW = drawH * (result.width / result.height); }
                  page.drawImage(pngImage, { x: indent, y: y - drawH, width: drawW, height: drawH });
                  y -= (drawH + 12);
                });
              });
            }
            var text = rawText.replace(/<[^>]*>/g, '').trim();
            if (!text) return;
            if (item.type === 'list') text = (item.checked ? '[x] ' : '[ ] ') + text;
            var maxWidth = 595.28 - indent - margin;
            if (maxWidth > 0) {
              page.drawText(text, { x: indent, y: y, size: 11, font: font, color: PDFLib.rgb(0.3, 0.3, 0.3), maxWidth: maxWidth });
            }
            y -= 18;
          });
        }, Promise.resolve());
        setStatus('PDF: 4/5 Generando PDF...');
        return processPromise.then(function() { return pdfDoc.save(); });
      });
    })
    .then(function(pdfBytes) {
      setStatus('PDF: 5/5 Guardando archivo...');
      saveFile(sanitizeFilename(note.title) + '.pdf', pdfBytes, 'application/pdf');
    })
    .catch(function(e) {
      var msg = e.message || JSON.stringify(e);
      console.error('PDF generation error:', e);
      setStatus('PDF Error: ' + msg);
    });
}
function exportCurrentNoteToPdf() { exportNoteToPdf(state.activeNoteId); }
function getExportText(noteId) {
  var note = state.notes.find(function(n) { return n.id === noteId; });
  if (!note) return '';
  var text = '';
  note.items.forEach(function(item) {
    if (item.type === 'image') {
      text += '[Imagen' + (item.caption ? ': ' + item.caption : '') + ']\n\n';
      return;
    }
    var t = (item.text || '').replace(/<[^>]*>/g, '').trim();
    if (!t) return;
    if (item.type === 'text') text += t + '\n\n';
    else text +='- ' + t + '\n';
  });
  return text || 'No content';
}
function exportNoteToTxt(noteId) {
  var note = state.notes.find(function(n) { return n.id === noteId; });
  if (!note) return;
  var text = getExportText(noteId);
  saveFile(sanitizeFilename(note.title) + '.txt', text, 'text/plain');
  trackExport();
}
function exportNoteToDoc(noteId) {
  var note = state.notes.find(function(n) { return n.id === noteId; });
  if (!note) return;
  trackExport();
  showToast(t('processingExport'));
  if (window.docx) {
    var children = [];
    var processPromise = note.items.reduce(function(promise, item) {
      return promise.then(function() {
        if (item.type === 'image') {
          return ImageManager.read(item.src).then(function(base64) {
            if (!base64) return;
            return ImageConverter.webpToPng(base64, item.width, item.height).then(function(pngBase64) {
              var pngBytes = ImageConverter.base64ToBytes(pngBase64);
              try {
                children.push(new docx.Paragraph({
                  children: [new docx.ImageRun({
                    data: pngBytes,
                    transformation: { width: Math.min(item.width || 400, 500), height: Math.min(item.height || 300, 500) }
                  })],
                  spacing: { before: 200, after: item.caption ? 40 : 200 }
                }));
                if (item.caption) {
                  children.push(new docx.Paragraph({
                    children: [new docx.TextRun({ text: item.caption, size: 16, color: '888888', italics: true })],
                    alignment: docx.AlignmentType.CENTER,
                    spacing: { after: 200 }
                  }));
                }
              } catch(e) {
                console.error('Error adding image to DOCX:', e);
              }
            });
          }).catch(function(err) {
            console.error('Image error in DOCX:', err);
          });
        }
        var rawText = (item.text || '').trim();
        if (!rawText) return;
        if (rawText.indexOf('$') >= 0) {
          /* Contains LaTeX - render to image */
          var displayHtml = renderLatexInHtml(parseNoteLinks(rawText));
          return renderTextToCanvas(displayHtml, 500).then(function(result) {
            var pngBytes = ImageConverter.base64ToBytes(result.base64);
            try {
              children.push(new docx.Paragraph({
                children: [new docx.ImageRun({
                  data: pngBytes,
                  transformation: { width: Math.min(result.width, 500), height: Math.min(result.height, 500) }
                })],
                spacing: { before: 200, after: 200 }
              }));
            } catch(e) {
              console.error('Error adding LaTeX image to DOCX:', e);
            }
          });
        }
        var text = rawText.replace(/<[^>]*>/g, '').trim();
        if (!text) return;
        if (item.type === 'list') text = (item.checked ? '\u2611 ' : '\u2610 ') + text;
        var indent = (item.level || 0) * 28;
        children.push(new docx.Paragraph({
          children: [new docx.TextRun({ text: text, size: 20 })],
          indent: { left: indent },
          spacing: { before: 60, after: 60 }
        }));
      });
    }, Promise.resolve());
    processPromise.then(function() {
      if (note.items.length === 0) {
        children.push(new docx.Paragraph({
          children: [new docx.TextRun({ text: 'No content', size: 20, color: '999999' })]
        }));
      }
      var doc = new docx.Document({ sections: [{ children: children }] });
      return docx.Packer.toBlob(doc);
    }).then(function(blob) {
      saveFile(sanitizeFilename(note.title) + '.docx', blob, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    }).catch(function(err) {
      console.error('Error exporting DOCX:', err);
      setStatus('Error al exportar DOCX: ' + (err.message || JSON.stringify(err)));
    });
  } else {
    setStatus('Error: librería DOCX no disponible');
  }
}
function exportCurrentNoteToTxt() { exportNoteToTxt(state.activeNoteId); }
function exportCurrentNoteToDoc() { exportNoteToDoc(state.activeNoteId); }
function toggleExportPalette() {
  var palette = document.getElementById('exportPalette');
  if (palette.classList.contains('hidden')) {
    var btn = document.querySelector('.exp-toggle');
    if (btn) {
      var rect = btn.getBoundingClientRect();
      palette.classList.remove('hidden');
      palette.style.top = (rect.top - palette.offsetHeight) + 'px';
      palette.style.left = (rect.right - palette.offsetWidth) + 'px';
    }
  } else {
    palette.classList.add('hidden');
  }
}

function changePostitColor(boardId, postitId, color) {
  var board = state.boards.find(function(b) { return b.id === boardId; });
  if (!board) return;
  var p = board.postits.find(function(p) { return p.id === postitId; });
  if (p) { p.color = color; save(); renderBoardContent(); }
}

function deleteConnection(boardId, fromId, toId) {
  var board = state.boards.find(function(b) { return b.id === boardId; });
  if (!board) return;
  board.connections = board.connections.filter(function(c) { return !(c.from === fromId && c.to === toId); });
  save();
  renderBoardContent();
}

/* === Funciones para elementos multimedia en tablero === */

function addBoardElement(type, ref, w, h, extra) {
  var board = state.boards.find(function(b) { return b.id === state.activeBoardId; });
  if (!board) return;
  if (!board.elements) board.elements = [];
  var wrap = document.querySelector('.board-canvas-wrap');
  var vx = wrap ? wrap.scrollLeft : 0;
  var vy = wrap ? wrap.scrollTop : 0;
  var el = {
    id: genId(),
    type: type,
    ref: ref,
    x: (vx + 50 + Math.round(Math.random() * 200)) / boardZoom,
    y: (vy + 50 + Math.round(Math.random() * 150)) / boardZoom,
    w: w || 200,
    h: h || 180,
    origWidth: extra && extra.origWidth ? extra.origWidth : (w || 200),
    origHeight: extra && extra.origHeight ? extra.origHeight : (h || 180),
    duration: extra && extra.duration ? extra.duration : 0
  };
  board.elements.push(el);
  save();
  renderBoardContent();
}

function addBoardEquation() {
  var board = state.boards.find(function(b) { return b.id === state.activeBoardId; });
  if (!board) return;
  if (!board.elements) board.elements = [];
  var wrap = document.querySelector('.board-canvas-wrap');
  var vx = wrap ? wrap.scrollLeft : 0;
  var vy = wrap ? wrap.scrollTop : 0;
  var el = {
    id: genId(),
    type: 'equation',
    latex: '\\int_a^b f(x)\\,dx',
    x: (vx + 50 + Math.round(Math.random() * 200)) / boardZoom,
    y: (vy + 50 + Math.round(Math.random() * 150)) / boardZoom,
    w: 300,
    h: 80
  };
  board.elements.push(el);
  save();
  renderBoardContent();
  openBoardEquationEditor(board.id, el.id);
}

function openBoardEquationEditor(boardId, elId) {
  var board = state.boards.find(function(b) { return b.id === boardId; });
  if (!board) return;
  var el = board.elements.find(function(e) { return e.id === elId; });
  if (!el || el.type !== 'equation') return;
  openLatexEditorForBoard(boardId, elId, el.latex || '');
}

function openLatexEditorForBoard(boardId, elId, latex) {
  var overlay = document.createElement('div');
  overlay.className = 'dialog-overlay';
  overlay.style.display = 'flex';
  overlay.innerHTML =
    '<div class="dialog" style="min-width:400px;max-width:600px;">' +
    '<h3>' + t('equationEditor') + '</h3>' +
    '<div class="field"><label>' + t('equationPlaceholder') + '</label>' +
    '<textarea id="eqEditorInput" spellcheck="false">' + escapeHtml(latex || '') + '</textarea></div>' +
    '<div class="field"><label>' + t('latexPreview') + '</label>' +
    '<div id="eqEditorPreview">' + (latex ? _renderLatex(latex, true) : '') + '</div></div>' +
    '<div id="eqEditorError"></div>' +
    '<div class="dialog-actions">' +
    '<button class="btn" id="eqEditorCancelBtn">' + t('cancel') + '</button>' +
    '<button class="btn btn-primary" id="eqEditorSaveBtn">' + t('save') + '</button></div></div>';
  document.body.appendChild(overlay);

  var input = document.getElementById('eqEditorInput');
  var preview = document.getElementById('eqEditorPreview');
  var error = document.getElementById('eqEditorError');

  function updatePreview() {
    var val = input.value.trim();
    if (!val) { preview.innerHTML = ''; error.textContent = ''; return; }
    try {
      var rendered = katex.renderToString(val, { throwOnError: false, displayMode: true });
      preview.innerHTML = rendered;
      error.textContent = '';
    } catch(e) {
      error.textContent = t('equationError');
    }
  }
  input.addEventListener('input', updatePreview);
  document.getElementById('eqEditorCancelBtn').addEventListener('click', function() {
    document.body.removeChild(overlay);
  });
  document.getElementById('eqEditorSaveBtn').addEventListener('click', function() {
    var newLatex = input.value.trim();
    if (boardId && elId) {
      var board = state.boards.find(function(b) { return b.id === boardId; });
      if (board) {
        var eqEl = board.elements.find(function(e) { return e.id === elId; });
        if (eqEl) {
          eqEl.latex = newLatex;
          eqEl.scale = undefined; /* reset scale on edit, re-auto-size */
          save();
          renderBoardContent();
        }
      }
    }
    document.body.removeChild(overlay);
  });
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) document.body.removeChild(overlay);
  });
  setTimeout(function() { input.focus(); input.select(); }, 100);
}

function openLatexEditorForPostit(boardId, postitId, latex, isBlock) {
  var overlay = document.createElement('div');
  overlay.className = 'dialog-overlay';
  overlay.style.display = 'flex';
  overlay.innerHTML =
    '<div class="dialog" style="min-width:400px;max-width:600px;">' +
    '<h3>' + t('equationEditor') + '</h3>' +
    '<div class="field"><label>' + t('equationPlaceholder') + '</label>' +
    '<textarea id="eqEditorInput" spellcheck="false">' + escapeHtml(latex || '') + '</textarea></div>' +
    '<div class="field"><label>' + t('latexPreview') + '</label>' +
    '<div id="eqEditorPreview">' + (latex ? _renderLatex(latex, isBlock) : '') + '</div></div>' +
    '<div id="eqEditorError"></div>' +
    '<div class="dialog-actions">' +
    '<button class="btn" id="eqEditorCancelBtn">' + t('cancel') + '</button>' +
    '<button class="btn btn-primary" id="eqEditorSaveBtn">' + t('save') + '</button></div></div>';
  document.body.appendChild(overlay);

  var input = document.getElementById('eqEditorInput');
  var preview = document.getElementById('eqEditorPreview');
  var error = document.getElementById('eqEditorError');

  function updatePreview() {
    var val = input.value.trim();
    if (!val) { preview.innerHTML = ''; error.textContent = ''; return; }
    try {
      var rendered = katex.renderToString(val, { throwOnError: false, displayMode: !!isBlock });
      preview.innerHTML = rendered;
      error.textContent = '';
    } catch(e) {
      error.textContent = t('equationError');
    }
  }
  input.addEventListener('input', updatePreview);
  document.getElementById('eqEditorCancelBtn').addEventListener('click', function() {
    document.body.removeChild(overlay);
  });
  document.getElementById('eqEditorSaveBtn').addEventListener('click', function() {
    var newLatex = input.value.trim();
    if (boardId && postitId) {
      var board = state.boards.find(function(b) { return b.id === boardId; });
      if (board) {
        var p = board.postits.find(function(p) { return p.id === postitId; });
        if (p) {
          var pattern = isBlock ? /(\$\$[\s\S]*?\$\$)/ : /\$[^\n$]+?\$/;
          var existing = p.text || '';
          var replaced = false;
          var newText = existing.replace(pattern, function(match) {
            if (!replaced) { replaced = true; return isBlock ? '$$\n' + newLatex + '\n$$' : '$' + newLatex + '$'; }
            return match;
          });
          if (replaced) p.text = newText;
          else p.text = existing + (isBlock ? '\n$$\n' + newLatex + '\n$$\n' : ' $' + newLatex + '$ ');
          save();
          renderBoardContent();
        }
      }
    }
    document.body.removeChild(overlay);
  });
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) document.body.removeChild(overlay);
  });
  setTimeout(function() { input.focus(); input.select(); }, 100);
}

function deleteBoardElement(boardId, elId) {
  var board = state.boards.find(function(b) { return b.id === boardId; });
  if (!board) return;
  var removed = null;
  board.elements = (board.elements || []).filter(function(el) {
    if (el.id === elId) removed = el;
    return el.id !== elId;
  });
  board.connections = (board.connections || []).filter(function(c) {
    return c.from !== elId && c.to !== elId;
  });
  save();
  renderBoardContent();
  /* Limpiar blob URL cacheados */
  if (removed && removed.ref && _mediaBlobUrls[removed.ref]) {
    URL.revokeObjectURL(_mediaBlobUrls[removed.ref]);
    delete _mediaBlobUrls[removed.ref];
  }
}

function duplicateBoardElement(boardId, elId) {
  var board = state.boards.find(function(b) { return b.id === boardId; });
  if (!board) return;
  var src = board.elements.find(function(el) { return el.id === elId; });
  if (!src) return;
  var copy = {
    id: genId(),
    type: src.type,
    ref: src.ref,
    x: src.x + 30,
    y: src.y + 30,
    w: src.w,
    h: src.h,
    origWidth: src.origWidth,
    origHeight: src.origHeight,
    duration: src.duration,
    latex: src.latex
  };
  board.elements.push(copy);
  save();
  renderBoardContent();
}

function updateBoardElementPosition(boardId, elId, x, y) {
  var board = state.boards.find(function(b) { return b.id === boardId; });
  if (!board) return;
  var el = board.elements.find(function(e) { return e.id === elId; });
  if (el) { el.x = Math.max(0, x); el.y = Math.max(0, y); save(); }
}

function updateBoardElementSize(boardId, elId, w, h) {
  var board = state.boards.find(function(b) { return b.id === boardId; });
  if (!board) return;
  var el = board.elements.find(function(e) { return e.id === elId; });
  if (el) { el.w = Math.max(40, w); el.h = Math.max(40, h); save(); }
}

function changeBoardElementZIndex(boardId, elId, action) {
  var board = state.boards.find(function(b) { return b.id === boardId; });
  if (!board) return;
  var elements = board.elements || [];
  var idx = -1;
  elements.forEach(function(el, i) { if (el.id === elId) idx = i; });
  if (idx < 0) return;
  var el = elements.splice(idx, 1)[0];
  if (action === 'front') elements.push(el);
  else elements.unshift(el);
  save();
  renderBoardContent();
}

function copyBoardElementToClipboard(boardId, elId) {
  var board = state.boards.find(function(b) { return b.id === boardId; });
  if (!board) return;
  var src = board.elements.find(function(el) { return el.id === elId; });
  if (!src) return;
  _boardElementClipboard = {
    type: src.type,
    ref: src.ref,
    w: src.w,
    h: src.h,
    origWidth: src.origWidth,
    origHeight: src.origHeight,
    duration: src.duration,
    latex: src.latex
  };
}

function pasteBoardElementFromClipboard(boardId) {
  if (!_boardElementClipboard) return;
  var board = state.boards.find(function(b) { return b.id === boardId; });
  if (!board) return;
  if (!board.elements) board.elements = [];
  var el = {
    id: genId(),
    type: _boardElementClipboard.type,
    ref: _boardElementClipboard.ref,
    x: 50,
    y: 50,
    w: _boardElementClipboard.w,
    h: _boardElementClipboard.h,
    origWidth: _boardElementClipboard.origWidth,
    origHeight: _boardElementClipboard.origHeight,
    duration: _boardElementClipboard.duration,
    latex: _boardElementClipboard.latex
  };
  board.elements.push(el);
  save();
  renderBoardContent();
}

/* Insertar imagen en tablero */
function triggerBoardImageInput() {
  document.getElementById('boardImageInput').value = '';
  document.getElementById('boardImageInput').click();
}

function insertBoardImage(input) {
  if (!input.files || !input.files[0]) return;
  var file = input.files[0];
  ImageConverter.toWebP(file, 0.85).then(function(result) {
    var ref = 'imagenes/' + generateImageId() + '.webp';
    return ImageManager.save(ref, result.base64).then(function() {
      var h = 180;
      var w = Math.round(h * (result.width / result.height));
      addBoardElement('image', ref, w, h, { origWidth: result.width, origHeight: result.height });
    });
  }).catch(function(err) {
    console.error('Error inserting board image:', err);
  });
}

/* Insertar audio en tablero */
function triggerBoardAudioInput() {
  document.getElementById('boardAudioInput').value = '';
  document.getElementById('boardAudioInput').click();
}

function insertBoardAudio(input) {
  if (!input.files || !input.files[0]) return;
  var file = input.files[0];
  AudioConverter.toBase64(file).then(function(base64) {
    var ext = file.name.split('.').pop().toLowerCase();
    var ref = 'audios/' + generateImageId() + '.' + ext;
    return ImageManager.save(ref, base64).then(function() {
      return AudioConverter.getDuration(file).then(function(dur) {
        addBoardElement('audio', ref, 140, 140, { duration: Math.round(dur) });
      }).catch(function() {
        addBoardElement('audio', ref, 140, 140);
      });
    });
  }).catch(function(err) {
    console.error('Error inserting board audio:', err);
  });
}

/* Insertar video en tablero */
function triggerBoardVideoInput() {
  document.getElementById('boardVideoInput').value = '';
  document.getElementById('boardVideoInput').click();
}

function insertBoardVideo(input) {
  if (!input.files || !input.files[0]) return;
  var file = input.files[0];
  VideoConverter.toBase64(file).then(function(base64) {
    var ext = file.name.split('.').pop().toLowerCase();
    var ref = 'videos/' + generateImageId() + '.' + ext;
    return ImageManager.save(ref, base64).then(function() {
      return VideoConverter.getDimensions(file).then(function(dims) {
        var h = 180;
        var w = Math.round(h * (dims.width / dims.height));
        addBoardElement('video', ref, w, h, { origWidth: dims.width, origHeight: dims.height });
      }).catch(function() {
        addBoardElement('video', ref, 240, 180);
      });
    });
  }).catch(function(err) {
    console.error('Error inserting board video:', err);
  });
}

/* Insertar audio grabado como elemento de tablero */
function addBoardAudioElement(ref) {
  addBoardElement('audio', ref, 140, 140);
}

/* Insertar audio grabado como item de nota */
function addAudioItemToNote(ref) {
  var note = state.notes.find(function(n) { return n.id === state.activeNoteId; });
  if (!note) return;
  note.items.push({ id: genId(), type: 'audio', ref: ref });
  save();
  renderNoteContent();
}

/* Insertar audio importado en nota */
function insertAudio(input) {
  if (!input.files || !input.files[0]) return;
  var file = input.files[0];
  AudioConverter.toBase64(file).then(function(base64) {
    var ext = file.name.split('.').pop().toLowerCase();
    var ref = 'audios/' + generateImageId() + '.' + ext;
    return ImageManager.save(ref, base64).then(function() {
      return addAudioItem(ref);
    });
  }).catch(function(err) {
    console.error('Error inserting audio:', err);
  });
}

function addAudioItem(ref) {
  var note = state.notes.find(function(n) { return n.id === state.activeNoteId; });
  if (!note) return;
  note.items.push({ id: genId(), type: 'audio', ref: ref });
  save();
  renderNoteContent();
}

function addAudioItemAtCursor(ref) {
  var note = state.notes.find(function(n) { return n.id === state.activeNoteId; });
  if (!note) return;
  var idx = -1;
  if (activeItemId !== null) {
    note.items.forEach(function(it, i) { if (it.id === activeItemId) idx = i; });
  }
  if (idx >= 0) {
    note.items.splice(idx + 1, 0, { id: genId(), type: 'audio', ref: ref });
  } else {
    note.items.push({ id: genId(), type: 'audio', ref: ref });
  }
  save();
  renderNoteContent();
}

/* Insertar video en nota */
function insertVideo(input) {
  if (!input.files || !input.files[0]) return;
  var file = input.files[0];
  VideoConverter.toBase64(file).then(function(base64) {
    var ext = file.name.split('.').pop().toLowerCase();
    var ref = 'videos/' + generateImageId() + '.' + ext;
    return ImageManager.save(ref, base64).then(function() {
      return addVideoItemAtCursor(ref);
    });
  }).catch(function(err) {
    console.error('Error inserting video:', err);
  });
}
function addVideoItemAtCursor(ref) {
  var note = state.notes.find(function(n) { return n.id === state.activeNoteId; });
  if (!note) return;
  var idx = -1;
  if (activeItemId !== null) {
    note.items.forEach(function(it, i) { if (it.id === activeItemId) idx = i; });
  }
  var item = { id: genId(), type: 'video', ref: ref };
  if (idx >= 0) note.items.splice(idx + 1, 0, item);
  else note.items.push(item);
  save();
  renderNoteContent();
}

/* Funciones para overlay de tamaño completo */
function showFullsizeView(contentHtml) {
  document.getElementById('fullsizeContent').innerHTML = contentHtml;
  showDialog('fullsizeOverlay');
}

function openBoardElementFullsize(boardId, elId) {
  var board = state.boards.find(function(b) { return b.id === boardId; });
  if (!board) return;
  var el = board.elements.find(function(e) { return e.id === elId; });
  if (!el) return;
  var ref = el.ref;
  if (el.type === 'image') {
    ImageManager.read(ref).then(function(base64) {
      if (!base64) return;
      var mime = ImageConverter.getMimeFromRef(ref);
      var src = 'data:' + mime + ';base64,' + base64;
      showFullsizeView('<img src="' + src + '" alt="" />');
    });
  } else if (el.type === 'video') {
    /* Pausar video en miniatura si se está reproduciendo */
    var thumbEl = document.querySelector('.board-element[data-id="' + elId + '"] video');
    if (thumbEl && !thumbEl.paused) { thumbEl.pause(); thumbEl._playRequested = false; }
    var url = _mediaBlobUrls[ref];
    if (url) {
      showFullsizeView('<video src="' + url + '" controls autoplay style="max-width:100%;max-height:90vh;"></video>');
    } else {
      ImageManager.read(ref).then(function(base64) {
        if (!base64) return;
        var mime = ImageConverter.getMimeFromRef(ref);
        var blob = _base64ToBlob(base64, mime);
        url = URL.createObjectURL(blob);
        _mediaBlobUrls[ref] = url;
        showFullsizeView('<video src="' + url + '" controls autoplay style="max-width:100%;max-height:90vh;"></video>');
      });
    }
  }
}

function closeFullsizeView() {
  closeDialog('fullsizeOverlay');
  var content = document.getElementById('fullsizeContent');
  /* Pausar cualquier video */
  var video = content.querySelector('video');
  if (video) video.pause();
  content.innerHTML = '';
}

/* Conexiones mejoradas: dibujar curva Bezier desde borde más cercano */
function updateImprovedConnections() {
  var wrap = document.querySelector('.board-canvas-wrap');
  if (!wrap) return;
  var svg = wrap.querySelector('svg.connections');
  if (!svg) return;
  var board = state.boards.find(function(b) { return b.id === state.activeBoardId; });
  if (!board) return;
  var allGroups = svg.querySelectorAll('.connection-group');
  board.connections.forEach(function(conn, i) {
    if (!allGroups[i]) return;
    var fromEl = document.querySelector('[data-id="' + conn.from + '"]');
    var toEl = document.querySelector('[data-id="' + conn.to + '"]');
    if (!fromEl || !toEl) return;
    var fRect = {
      left: parseFloat(fromEl.style.left) || 0,
      top: parseFloat(fromEl.style.top) || 0,
      w: fromEl.offsetWidth || 180,
      h: fromEl.offsetHeight || 180
    };
    var tRect = {
      left: parseFloat(toEl.style.left) || 0,
      top: parseFloat(toEl.style.top) || 0,
      w: toEl.offsetWidth || 180,
      h: toEl.offsetHeight || 180
    };
    /* Encontrar bordes más cercanos */
    var result = _findClosestEdges(fRect, tRect);
    var fx = result.fx, fy = result.fy, tx = result.tx, ty = result.ty;
    var dx = tx - fx;
    var dy = ty - fy;
    var dist = Math.sqrt(dx * dx + dy * dy);
    /* Control points con caída gravitacional */
    var sag = Math.min(dist * 0.15, 60);
    var cx1 = fx + dx * 0.4;
    var cy1 = fy + dy * 0.3 + sag;
    var cx2 = fx + dx * 0.6;
    var cy2 = fy + dy * 0.7 + sag;
    var d = 'M ' + fx + ',' + fy + ' C ' + cx1 + ',' + cy1 + ' ' + cx2 + ',' + cy2 + ' ' + tx + ',' + ty;
    var line = allGroups[i].querySelector('.connection-line');
    if (line) line.setAttribute('d', d);
    var hoverLine = allGroups[i].querySelector('.connection-line-hover');
    if (hoverLine) hoverLine.setAttribute('d', d);
    /* Pines en los extremos */
    var pinSvg = wrap.querySelector('svg.board-pins');
    if (pinSvg) {
      var pins = pinSvg.querySelectorAll('.connection-pin');
      var pi = i * 2;
      if (pins[pi]) { pins[pi].setAttribute('cx', fx); pins[pi].setAttribute('cy', fy); }
      if (pins[pi + 1]) { pins[pi + 1].setAttribute('cx', tx); pins[pi + 1].setAttribute('cy', ty); }
    }
  });
}

/* Encuentra los bordes más cercanos entre dos rectángulos */
function _findClosestEdges(r1, r2) {
  var r1cx = r1.left + r1.w / 2, r1cy = r1.top + r1.h / 2;
  var r2cx = r2.left + r2.w / 2, r2cy = r2.top + r2.h / 2;
  /* 8 puntos candidatos: 4 esquinas + 4 centros de borde */
  var pts1 = [
    { x: r1.left, y: r1.top }, { x: r1.left + r1.w, y: r1.top },
    { x: r1.left, y: r1.top + r1.h }, { x: r1.left + r1.w, y: r1.top + r1.h },
    { x: r1.left + r1.w / 2, y: r1.top }, { x: r1.left + r1.w, y: r1.top + r1.h / 2 },
    { x: r1.left + r1.w / 2, y: r1.top + r1.h }, { x: r1.left, y: r1.top + r1.h / 2 }
  ];
  var pts2 = [
    { x: r2.left, y: r2.top }, { x: r2.left + r2.w, y: r2.top },
    { x: r2.left, y: r2.top + r2.h }, { x: r2.left + r2.w, y: r2.top + r2.h },
    { x: r2.left + r2.w / 2, y: r2.top }, { x: r2.left + r2.w, y: r2.top + r2.h / 2 },
    { x: r2.left + r2.w / 2, y: r2.top + r2.h }, { x: r2.left, y: r2.top + r2.h / 2 }
  ];
  var minDist = Infinity, best = { fx: r1cx, fy: r1cy, tx: r2cx, ty: r2cy };
  for (var i = 0; i < pts1.length; i++) {
    for (var j = 0; j < pts2.length; j++) {
      var dx = pts2[j].x - pts1[i].x;
      var dy = pts2[j].y - pts1[i].y;
      var dist = dx * dx + dy * dy;
      if (dist < minDist) {
        minDist = dist;
        best.fx = pts1[i].x; best.fy = pts1[i].y;
        best.tx = pts2[j].x; best.ty = pts2[j].y;
      }
    }
  }
  return best;
}

function renderBoardContent() {
  var container = document.getElementById('boardContent');
  var board = state.boards.find(function(b) { return b.id === state.activeBoardId; });
  if (!board) {
    var html = '<div class="selection-view"><div class="selection-header"><h2>' + t('boards') + '</h2></div><div class="selection-grid">';
    if (state.boards.length === 0) {
      html += '<div class="selection-empty">' + t('noBoards') + '</div>';
    } else {
      state.boards.forEach(function(b) {
        var pc = (b.postits ? b.postits.length : 0) + ((b.elements && b.elements.length) || 0);
        var locked = b.pwdHash && !unlockedIds['b' + b.id];
        var lock = locked ? '<span class="card-lock">&#x1f512;</span>' : '';
        var preview = locked ? t('passwordProtected') : pc + ' elemento' + (pc !== 1 ? 's' : '');
        html += '<div class="card" data-board-id="' + b.id + '" onclick="selectBoard(' + b.id + ')">' +
          '<span class="card-drag-handle" onclick="event.stopPropagation()"><span class="drag-icon">&#x2630;</span></span>' +
          lock +
          '<span class="card-date">' + fmtDate(b.createdAt) + '</span>' +
          '<div class="card-title">' + escapeHtml(b.name) + '</div>' +
          '<div class="card-preview">' + preview + '</div></div>';
      });
    }
    html += '</div></div>';
    var gridScroll = document.querySelector('.selection-grid');
    var savedGridScroll = gridScroll ? gridScroll.scrollTop : 0;
    container.innerHTML = html;
    updateBackBtn();
    if (savedGridScroll > 0) { var ng = document.querySelector('.selection-grid'); if (ng) ng.scrollTop = savedGridScroll; }
    return;
  }
  updateBackBtn();

  // Guardar scroll antes de re-renderizar
  var oldWrap = document.querySelector('.board-canvas-wrap');
  var sx = oldWrap ? oldWrap.scrollLeft : 0;
  var sy = oldWrap ? oldWrap.scrollTop : 0;

  // Calcular dimensiones del canvas infinito
  var MIN_W = 3000, MIN_H = 3000;
  var maxX = MIN_W, maxY = MIN_H;
  (board.postits || []).forEach(function(p) {
    var right = p.x + (p.w || 180) + 600;
    var bottom = p.y + (p.h || 180) + 600;
    if (right > maxX) maxX = right;
    if (bottom > maxY) maxY = bottom;
  });
  (board.elements || []).forEach(function(el) {
    var right = el.x + (el.w || 200) + 600;
    var bottom = el.y + (el.h || 180) + 600;
    if (right > maxX) maxX = right;
    if (bottom > maxY) maxY = bottom;
  });
  maxX = Math.ceil(maxX / 100) * 100;
  maxY = Math.ceil(maxY / 100) * 100;

  var html = '<div class="board-toolbar">' + (board.pwdHash ? '<span style="font-size:14px;opacity:0.4;margin-right:4px;">&#x1f512;</span>' : '');
  html += '<div class="color-group">';
  POSTIT_COLORS.forEach(function(c) {
    html += '<button class="color-btn" style="background:' + COLOR_VALS[c] + '" onclick="addPostit(\'' + c + '\')" title="' + t('postit') + ' ' + c + '"></button>';
  });
  html += '</div>';
  html += '<span class="sep"></span>';
  html += '<button class="btn btn-icon" onclick="triggerBoardImageInput()" title="' + t('insertBoardImage') + '">&#x1f304;</button>';
  html += '<button class="btn btn-icon" onclick="triggerBoardAudioInput()" title="' + t('insertBoardAudio') + '">&#x1F3A4;</button>';
  html += '<button class="btn btn-icon" onclick="triggerBoardVideoInput()" title="' + t('insertBoardVideo') + '">&#x1F3AC;</button>';
  html += '<button class="btn btn-icon" onclick="addBoardEquation()" title="' + t('boardInsertEquation') + '" style="font-weight:bold;font-size:15px;">&#x2211;</button>';
  html += '<span style="flex:1;text-align:center;">';
  html += '<button class="btn" onclick="resetBoardZoom()" title="' + t('resetZoom') + '" style="font-size:11px;">' + Math.round(boardZoom * 100) + '%</button>';
  html += '</span>';
  html += '</div>';
  html += '<div class="board-outer-wrap"><div class="board-canvas-wrap bg-' + board.boardBg + (state.boardShowShadows === false ? ' board-no-shadows' : '') + (state.boardShowAnimations === false ? ' no-animations' : '') + '" data-board-id="' + board.id + '">';
  var vz = boardZoom;
  html += '<div class="board-zoom-layer" style="width:' + (maxX * vz) + 'px;height:' + (maxY * vz) + 'px;">';
  html += '<div class="board-canvas-inner" style="width:' + maxX + 'px;height:' + maxY + 'px;transform-origin:0 0;transform:scale(' + vz + ');"><div class="connect-overlay"></div>';
  html += '<svg class="connections">';
  board.connections.forEach(function(conn) {
    html += '<g class="connection-group" onclick="deleteConnection(' + board.id + ', ' + conn.from + ', ' + conn.to + ')" style="cursor:pointer;">';
    html += '<path class="connection-line" data-from="' + conn.from + '" data-to="' + conn.to + '" />';
    html += '<path class="connection-line-hover" data-from="' + conn.from + '" data-to="' + conn.to + '" />';
    html += '</g>';
  });
  html += '</svg>';
  html += '<svg class="board-pins">';
  board.connections.forEach(function(conn) {
    html += '<circle class="connection-pin" r="8" data-from="' + conn.from + '" data-to="' + conn.to + '" />';
    html += '<circle class="connection-pin" r="8" data-from="' + conn.from + '" data-to="' + conn.to + '" />';
  });
  html += '</svg>';
  /* Render post-its existentes */
  (board.postits || []).forEach(function(p) {
    html += '<div class="postit ' + p.color + '" data-id="' + p.id + '" style="left:' + p.x + 'px;top:' + p.y + 'px;width:' + p.w + 'px;height:' + p.h + 'px;" onclick="if(event.target.closest(\'.postit-close\') || event.target.closest(\'.postit-color-dot\'))return;startConnection(' + p.id + ')">';
    html += '<div class="postit-header">';
    POSTIT_COLORS.forEach(function(c) {
      html += '<span class="postit-color-dot ' + (c === p.color ? 'active' : '') + '" style="background:' + COLOR_VALS[c] + '" onclick="event.stopPropagation();changePostitColor(' + board.id + ', ' + p.id + ', \'' + c + '\')"></span>';
    });
    html += '</div>';
    html += '<button class="postit-close" onclick="deletePostit(' + board.id + ', ' + p.id + ')">&times;</button>';
    html += '<div class="postit-body"><div contenteditable="true" class="postit-text" data-placeholder="' + t('itemPlaceholder') + '" oninput="updatePostitText(' + board.id + ', ' + p.id + ', this.innerHTML)">' + renderLatexInHtml(parseRegistrosForRender(parseDiaryVariablesForRender(parseNoteLinks(p.text || '')))) + '</div></div>';
    html += '</div>';
  });
  /* Render elementos multimedia */
  (board.elements || []).forEach(function(el) {
    if (el.type === 'image') {
      html += '<div class="board-element board-image" data-id="' + el.id + '" data-type="image" style="left:' + el.x + 'px;top:' + el.y + 'px;width:' + el.w + 'px;height:' + el.h + 'px;" onclick="if(event.target.closest(\'.edit-handle,.board-el-close,button\'))return;startConnection(' + el.id + ')" ondblclick="event.stopPropagation();openBoardElementFullsize(' + board.id + ',' + el.id + ')">';
      html += '<img src="" data-ref="' + escapeHtml(el.ref) + '" alt="" />';
      html += '<button class="board-el-close" onclick="deleteBoardElement(' + board.id + ', ' + el.id + ')">&times;</button>';
      
      html += '</div>';
    } else if (el.type === 'audio') {
      html += '<div class="board-element board-audio" data-id="' + el.id + '" data-type="audio" style="left:' + el.x + 'px;top:' + el.y + 'px;width:' + el.w + 'px;height:' + el.h + 'px;" onclick="if(event.target.closest(\'.board-el-close,.audio-player,button\'))return;startConnection(' + el.id + ')">';
      html += '<button class="board-el-close" onclick="deleteBoardElement(' + board.id + ', ' + el.id + ')">&times;</button>';
      html += '<div class="audio-mic-icon">&#x1F399;</div>';
      html += '<div class="board-audio-player" data-ref="' + escapeHtml(el.ref) + '"></div>';
      html += '</div>';
    } else if (el.type === 'video') {
      html += '<div class="board-element board-video" data-id="' + el.id + '" data-type="video" style="left:' + el.x + 'px;top:' + el.y + 'px;width:' + el.w + 'px;height:' + el.h + 'px;" onclick="if(event.target.closest(\'.edit-handle,.board-el-close,button\'))return;startConnection(' + el.id + ')" ondblclick="event.stopPropagation();openBoardElementFullsize(' + board.id + ',' + el.id + ')">';
      html += '<video src="" data-ref="' + escapeHtml(el.ref) + '" preload="metadata" playsinline></video>';
      html += '<div class="board-video-overlay">';
      html += '<button class="bv-play" data-board-id="' + board.id + '" data-el-id="' + el.id + '">&#x25B6;</button>';
      html += '<button class="bv-restart" data-board-id="' + board.id + '" data-el-id="' + el.id + '">&#x21BA;</button>';
      html += '</div>';
      html += '<button class="board-el-close" onclick="deleteBoardElement(' + board.id + ', ' + el.id + ')">&times;</button>';
      
      html += '</div>';
    } else if (el.type === 'equation') {
      var eqHtml = el.latex ? _renderLatex(el.latex, true) : '';
      html += '<div class="board-element board-equation" data-id="' + el.id + '" data-type="equation" style="left:' + el.x + 'px;top:' + el.y + 'px;width:' + el.w + 'px;height:' + el.h + 'px;" onclick="if(event.target.closest(\'.board-el-close,button\'))return;startConnection(' + el.id + ')">';
      html += '<div class="board-equation-content">' + eqHtml + '</div>';
      html += '<button class="board-el-close" onclick="deleteBoardElement(' + board.id + ', ' + el.id + ')">&times;</button>';
      html += '</div>';
    }
  });
  html += '</div></div></div></div>';
  container.innerHTML = html;
  applyBoardZoom();
  /* Auto-size equation elements to fit content */
  var eqEls = container.querySelectorAll('.board-equation');
  [].forEach.call(eqEls, function(eqEl) {
    var content = eqEl.querySelector('.board-equation-content');
    if (!content) return;
    var elId = Number(eqEl.getAttribute('data-id'));
    var elData = null;
    if (elId) {
      var b = state.boards.find(function(x) { return x.id === state.activeBoardId; });
      if (b) { elData = b.elements.find(function(e) { return e.id === elId; }); }
    }
    /* Temporarily remove fixed sizes to measure natural dimensions */
    content.style.width = 'auto';
    eqEl.style.width = 'auto';
    eqEl.style.height = 'auto';
    var naturalW = eqEl.scrollWidth;
    var naturalH = eqEl.scrollHeight;
    var padding = 24;
    var newW = Math.max(100, naturalW);
    var newH = Math.max(50, naturalH);
    if (elData && elData.type === 'equation' && elData.scale && elData.scale < 1) {
      /* User-resized — keep stored container size, apply scale */
      eqEl.style.width = elData.w + 'px';
      eqEl.style.height = elData.h + 'px';
    } else {
      /* Auto-size to natural dimensions */
      eqEl.style.width = newW + 'px';
      eqEl.style.height = newH + 'px';
      if (elData && elData.type === 'equation') {
        elData.w = newW;
        elData.h = newH;
      }
    }
    /* Store natural content dimensions for resize scaling */
    content.style.width = '';
    var cw = content.scrollWidth;
    var ch = content.scrollHeight;
    content.setAttribute('data-natural-w', cw);
    content.setAttribute('data-natural-h', ch);
    content.style.width = cw + 'px';
    content.style.height = ch + 'px';
    if (elData && elData.type === 'equation' && elData.scale && elData.scale < 1) {
      _adjustBoardEquationScale(eqEl, elData.scale);
    }
  });
  /* Cargar imágenes de elementos multimedia */
  loadBoardElementImages();
  loadBoardAudios();
  loadBoardVideos();
  setTimeout(function() {
    var wrap = document.querySelector('.board-canvas-wrap');
    if (wrap) { wrap.scrollLeft = sx; wrap.scrollTop = sy; }
    updateImprovedConnections();
  }, 50);
}

/* Cargar imágenes de elementos multimedia en tablero */
function loadBoardElementImages() {
  var imgs = document.querySelectorAll('.board-image img[data-ref]');
  [].forEach.call(imgs, function(img) {
    var ref = img.getAttribute('data-ref');
    if (!ref) return;
    img.removeAttribute('data-ref');
    ImageManager.read(ref).then(function(base64) {
      if (base64) {
        var mime = ImageConverter.getMimeFromRef(ref);
        img.src = 'data:' + mime + ';base64,' + base64;
      }
    }).catch(function(err) {
      console.error('Error loading board image:', ref, err);
    });
  });
}

/* Cargar audios en elementos de tablero */
function loadBoardAudios() {
  var containers = document.querySelectorAll('.board-audio-player[data-ref]');
  [].forEach.call(containers, function(container) {
    var ref = container.getAttribute('data-ref');
    if (!ref) return;
    container.removeAttribute('data-ref');
    createAudioPlayer(ref, container, {
      onend: function() {
        /* Al terminar, vuelve al inicio (ya manejado en createAudioPlayer) */
      }
    });
  });
}

/* Cargar videos en elementos de tablero */
function loadBoardVideos() {
  var videos = document.querySelectorAll('.board-video video[data-ref]');
  [].forEach.call(videos, function(videoEl) {
    var ref = videoEl.getAttribute('data-ref');
    if (!ref) return;
    videoEl.removeAttribute('data-ref');
    ImageManager.read(ref).then(function(base64) {
      if (!base64) return;
      var mime = ImageConverter.getMimeFromRef(ref);
      var blob = _base64ToBlob(base64, mime);
      var url = URL.createObjectURL(blob);
      _mediaBlobUrls[ref] = url;
      videoEl.src = url;
      videoEl._playRequested = false;

      var boardEl = videoEl.closest('.board-element');
      var playBtn = boardEl ? boardEl.querySelector('.bv-play') : null;
      var restartBtn = boardEl ? boardEl.querySelector('.bv-restart') : null;

      function syncIcon() {
        if (!playBtn) return;
        playBtn.innerHTML = videoEl.paused ? '&#x25B6;' : '&#x23F8;';
      }
      function doPlay() {
        if (!videoEl.paused || videoEl._playRequested) return;
        videoEl._playRequested = true;
        videoEl.play().then(function() { videoEl._playRequested = false; syncIcon(); }).catch(function() { videoEl._playRequested = false; syncIcon(); });
        syncIcon();
      }
      function doPause() {
        videoEl._playRequested = false;
        videoEl.pause();
        syncIcon();
      }

      /* Botón overlay play/pausa */
      if (playBtn) {
        playBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          if (videoEl.paused) doPlay(); else doPause();
        });
      }

      /* Botón overlay reiniciar */
      if (restartBtn) {
        restartBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          videoEl._playRequested = false;
          videoEl.pause();
          videoEl.currentTime = 0;
          syncIcon();
        });
      }

      /* Sincronizar icono con eventos nativos */
      videoEl.addEventListener('play', syncIcon);
      videoEl.addEventListener('pause', syncIcon);
      videoEl.addEventListener('ended', function() {
        videoEl.currentTime = 0;
        videoEl._playRequested = false;
        syncIcon();
      });
    });
  });
}

function updateConnectionLines() {
  var wrap = document.querySelector('.board-canvas-wrap');
  if (!wrap) return;
  var svg = wrap.querySelector('svg.connections');
  var pinSvg = wrap.querySelector('svg.board-pins');
  if (!svg || !pinSvg) return;
  var board = state.boards.find(function(b) { return b.id === state.activeBoardId; });
  if (!board) return;
  var groups = svg.querySelectorAll('.connection-group');
  var pins = pinSvg.querySelectorAll('.connection-pin');
  board.connections.forEach(function(conn, i) {
    var fromEl = document.querySelector('.postit[data-id="' + conn.from + '"]') || document.querySelector('.board-element[data-id="' + conn.from + '"]');
    var toEl = document.querySelector('.postit[data-id="' + conn.to + '"]') || document.querySelector('.board-element[data-id="' + conn.to + '"]');
    if (fromEl && toEl && groups[i]) {
      var fx = parseInt(fromEl.style.left) + fromEl.offsetWidth / 2;
      var fy = parseInt(fromEl.style.top);
      var tx = parseInt(toEl.style.left) + toEl.offsetWidth / 2;
      var ty = parseInt(toEl.style.top);
      groups[i].querySelector('.connection-line').setAttribute('d', 'M' + fx + ',' + fy + ' L' + tx + ',' + ty);
      var pi = i * 2;
      if (pins[pi]) { pins[pi].setAttribute('cx', fx); pins[pi].setAttribute('cy', fy); }
      if (pins[pi + 1]) { pins[pi + 1].setAttribute('cx', tx); pins[pi + 1].setAttribute('cy', ty); }
    }
  });
}


// Post-it and board element dragging
document.addEventListener('mousedown', function(e) {
  var el = null;
  var type = 'postit';
  var header = e.target.closest('.postit-header');
  if (header) {
    el = header.closest('.postit');
    if (!el) return;
    if (e.target.tagName === 'TEXTAREA') return;
  } else {
    el = e.target.closest('.board-element');
    if (!el) return;
    type = 'element';
    if (e.target.closest('.edit-handle, .board-el-close, .audio-player, button')) return;
  }
  var wrap = el.closest('.board-canvas-wrap');
  if (!wrap) return;
  var boardId = wrap.dataset.boardId;
  if (!boardId) return;
  postitDragState = {
    boardId: boardId, elementId: el.dataset.id, type: type,
    startX: e.clientX, startY: e.clientY,
    origX: parseInt(el.style.left) || 0, origY: parseInt(el.style.top) || 0,
    el: el
  };
  el.classList.add('dragging');
  e.preventDefault();
});

document.addEventListener('mousemove', function(e) {
  if (!postitDragState) return;
  var dx = (e.clientX - postitDragState.startX) / boardZoom;
  var dy = (e.clientY - postitDragState.startY) / boardZoom;
  var nx = Math.max(0, postitDragState.origX + dx);
  var ny = Math.max(0, postitDragState.origY + dy);
  postitDragState.el.style.left = nx + 'px';
  postitDragState.el.style.top = ny + 'px';
  updateImprovedConnections();
});

document.addEventListener('mouseup', function(e) {
  if (!postitDragState) return;
  postitDragState.el.classList.remove('dragging');
  var board = state.boards.find(function(b) { return b.id === Number(postitDragState.boardId); });
  if (board) {
    if (postitDragState.type === 'element') {
      var el = board.elements.find(function(e) { return e.id === Number(postitDragState.elementId); });
      if (el) { el.x = parseInt(postitDragState.el.style.left); el.y = parseInt(postitDragState.el.style.top); }
    } else {
      var p = board.postits.find(function(p) { return p.id === Number(postitDragState.elementId); });
      if (p) { p.x = parseInt(postitDragState.el.style.left); p.y = parseInt(postitDragState.el.style.top); }
    }
  }
  save();
  postitDragState = null;
});

// Edit mode for board elements (8-handle resize)
var _editModeElementId = null;

function toggleEditMode(boardId, elId) {
  if (_editModeElementId === elId) {
    _exitEditMode();
    return;
  }
  _exitEditMode();
  _editModeElementId = elId;
  var el = document.querySelector('.board-element[data-id="' + elId + '"]');
  if (!el) { _editModeElementId = null; return; }
  el.classList.add('editing');
  var dirs = ['nw','n','ne','e','se','s','sw','w'];
  dirs.forEach(function(dir) {
    var h = document.createElement('div');
    h.className = 'edit-handle';
    h.setAttribute('data-dir', dir);
    el.appendChild(h);
  });
}

function _exitEditMode() {
  if (_editModeElementId) {
    var el = document.querySelector('.board-element[data-id="' + _editModeElementId + '"]');
    if (el) {
      el.classList.remove('editing');
      var handles = el.querySelectorAll('.edit-handle');
      Array.prototype.forEach.call(handles, function(h) { h.remove(); });
    }
  }
  _editModeElementId = null;
}

// Resize board elements (image/video) — dir-aware, 8 directions
var _resizeState = null;

function _startResize(clientX, clientY, el, dir) {
  var wrap = el.closest('.board-canvas-wrap');
  if (!wrap) return;
  var boardId = Number(wrap.dataset.boardId);
  var elId = Number(el.dataset.id);
  _resizeState = {
    boardId: boardId, elId: elId,
    startX: clientX, startY: clientY,
    origX: parseFloat(el.style.left) || 0,
    origY: parseFloat(el.style.top) || 0,
    origW: el.offsetWidth || 200,
    origH: el.offsetHeight || 200,
    dir: dir || 'se',
    el: el
  };
  var elData = _findBoardElement(boardId, elId);
  if (elData && elData.origWidth && elData.origHeight) {
    _resizeState.origWidth = elData.origWidth;
    _resizeState.origHeight = elData.origHeight;
  }
}

function _findBoardElement(boardId, elId) {
  var board = state.boards.find(function(b) { return b.id === boardId; });
  if (!board) return null;
  return board.elements.find(function(el) { return el.id === elId; }) || null;
}

function _doResize(clientX, clientY) {
  if (!_resizeState) return;
  var rs = _resizeState;
  var dx = (clientX - rs.startX) / boardZoom;
  var dy = (clientY - rs.startY) / boardZoom;
  var dir = rs.dir;

  var newX = rs.origX, newY = rs.origY;
  var newW = rs.origW, newH = rs.origH;

  if (dir.indexOf('e') !== -1) newW = Math.max(60, rs.origW + dx);
  if (dir.indexOf('w') !== -1) { newW = Math.max(60, rs.origW - dx); newX = rs.origX + (rs.origW - newW); }
  if (dir.indexOf('s') !== -1) newH = Math.max(60, rs.origH + dy);
  if (dir.indexOf('n') !== -1) { newH = Math.max(60, rs.origH - dy); newY = rs.origY + (rs.origH - newH); }

  /* Maintain aspect ratio for corners (dir with both a horizontal and vertical component) */
  if (rs.origWidth && rs.origHeight) {
    var isCorner = (dir.indexOf('e') !== -1 || dir.indexOf('w') !== -1) &&
                   (dir.indexOf('s') !== -1 || dir.indexOf('n') !== -1);
    if (isCorner) {
      var ratio = rs.origWidth / rs.origHeight;
      var hFromW = newW / ratio;
      var wFromH = newH * ratio;
      /* Use the dimension with larger delta */
      if (Math.abs(dx) > Math.abs(dy)) {
        newH = hFromW;
        /* If n is involved, adjust y */
        if (dir.indexOf('n') !== -1) newY = rs.origY + (rs.origH - newH);
      } else {
        newW = wFromH;
        if (dir.indexOf('w') !== -1) newX = rs.origX + (rs.origW - newW);
      }
    }
  }

  rs.el.style.left = Math.round(newX) + 'px';
  rs.el.style.top = Math.round(newY) + 'px';
  rs.el.style.width = Math.round(newW) + 'px';
  rs.el.style.height = Math.round(newH) + 'px';
}

function _endResize() {
  if (!_resizeState) return;
  var board = state.boards.find(function(b) { return b.id === _resizeState.boardId; });
  if (board) {
    var boardEl = board.elements.find(function(el) { return el.id === _resizeState.elId; });
    if (boardEl) {
      boardEl.x = parseFloat(_resizeState.el.style.left) || 0;
      boardEl.y = parseFloat(_resizeState.el.style.top) || 0;
      boardEl.w = _resizeState.el.offsetWidth || boardEl.w;
      boardEl.h = _resizeState.el.offsetHeight || boardEl.h;
      if (boardEl.type === 'equation') {
        _recalcEquationScale(_resizeState.el, boardEl);
      }
      save();
    }
  }
  _resizeState = null;
}

function _recalcEquationScale(el, data) {
  var content = el.querySelector('.board-equation-content');
  if (!content) return;
  var naturalW = Number(content.getAttribute('data-natural-w'));
  var naturalH = Number(content.getAttribute('data-natural-h'));
  if (!naturalW || !naturalH) return;
  var containerW = el.offsetWidth - 24;
  var containerH = el.offsetHeight - 24;
  if (containerW <= 0 || containerH <= 0) return;
  var scaleX = containerW / naturalW;
  var scaleY = containerH / naturalH;
  var scale = Math.min(scaleX, scaleY, 1);
  data.scale = scale < 1 ? scale : undefined;
  _adjustBoardEquationScale(el, scale);
}

function _adjustBoardEquationScale(eqEl, scale) {
  var content = eqEl.querySelector('.board-equation-content');
  if (!content) return;
  if (!scale || scale >= 1) {
    content.style.transform = '';
    content.style.width = '';
    content.style.height = '';
    eqEl.classList.remove('equation-scaled');
    return;
  }
  var naturalW = Number(content.getAttribute('data-natural-w'));
  var naturalH = Number(content.getAttribute('data-natural-h'));
  if (!naturalW || !naturalH) return;
  content.style.width = naturalW + 'px';
  content.style.height = naturalH + 'px';
  content.style.transform = 'scale(' + scale + ')';
  eqEl.classList.add('equation-scaled');
}

document.addEventListener('mousedown', function(e) {
  var handle = e.target.closest('.edit-handle');
  if (!handle) return;
  var el = handle.closest('.board-element');
  if (!el) return;
  if (el.dataset.type === 'audio') return;
  _startResize(e.clientX, e.clientY, el, handle.getAttribute('data-dir') || 'se');
  e.preventDefault();
  e.stopPropagation();
});
document.addEventListener('mousemove', function(e) {
  _doResize(e.clientX, e.clientY);
});
document.addEventListener('mouseup', function(e) {
  _endResize();
});

// Board pan (drag on empty space to scroll)
document.addEventListener('mousedown', function(e) {
  if (boardPanState) return;
  var wrap = e.target.closest('.board-canvas-wrap');
  if (!wrap) return;
  if (e.target.closest('.postit, .board-element, .connection-group, .connection-pin, .board-toolbar, button, input, textarea, [contenteditable]')) return;
  boardPanState = {
    startX: e.clientX, startY: e.clientY,
    startScrollLeft: wrap.scrollLeft, startScrollTop: wrap.scrollTop,
    wrap: wrap, active: false
  };
});
document.addEventListener('mousemove', function(e) {
  if (!boardPanState) return;
  var dx = e.clientX - boardPanState.startX;
  var dy = e.clientY - boardPanState.startY;
  if (!boardPanState.active) {
    if (Math.abs(dx) < 5 && Math.abs(dy) < 5) return;
    boardPanState.active = true;
    boardPanState.wrap.classList.add('panning');
  }
  boardPanState.wrap.scrollLeft = boardPanState.startScrollLeft - dx;
  boardPanState.wrap.scrollTop = boardPanState.startScrollTop - dy;
  e.preventDefault();
});
document.addEventListener('mouseup', function(e) {
  if (!boardPanState) return;
  boardPanState.wrap.classList.remove('panning');
  boardPanState = null;
});

// Touch pan for board (Android)
document.addEventListener('touchstart', function(e) {
  if (e.touches.length !== 1 || boardPanState) return;
  var wrap = e.target.closest('.board-canvas-wrap');
  if (!wrap) return;
  if (e.target.closest('.postit, .board-element, .connection-group, .connection-pin, .board-toolbar, button, input, textarea, [contenteditable]')) return;
  var t = e.touches[0];
  boardPanState = {
    startX: t.clientX, startY: t.clientY,
    startScrollLeft: wrap.scrollLeft, startScrollTop: wrap.scrollTop,
    wrap: wrap, active: false
  };
}, { passive: true });
document.addEventListener('touchmove', function(e) {
  if (!boardPanState) return;
  var t = e.touches[0];
  var dx = t.clientX - boardPanState.startX;
  var dy = t.clientY - boardPanState.startY;
  if (!boardPanState.active) {
    if (Math.abs(dx) < 5 && Math.abs(dy) < 5) return;
    boardPanState.active = true;
    boardPanState.wrap.classList.add('panning');
  }
  boardPanState.wrap.scrollLeft = boardPanState.startScrollLeft - dx;
  boardPanState.wrap.scrollTop = boardPanState.startScrollTop - dy;
  e.preventDefault();
}, { passive: false });
document.addEventListener('touchend', function(e) {
  if (!boardPanState) return;
  boardPanState.wrap.classList.remove('panning');
  boardPanState = null;
});

// Touch drag for post-its and board elements (Android)
document.addEventListener('touchstart', function(e) {
  if (e.touches.length !== 1) return;
  var el = null, type = 'postit';
  var header = e.target.closest('.postit-header');
  if (header) {
    el = header.closest('.postit');
    if (!el) return;
    if (e.target.tagName === 'TEXTAREA') return;
  } else {
    el = e.target.closest('.board-element');
    if (!el) return;
    type = 'element';
    if (e.target.closest('.edit-handle, .board-el-close, .audio-player, button')) return;
  }
  var wrap = el.closest('.board-canvas-wrap');
  if (!wrap) return;
  var boardId = wrap.dataset.boardId;
  if (!boardId) return;
  var touch = e.touches[0];
  postitDragState = {
    boardId: boardId, elementId: el.dataset.id, type: type,
    startX: touch.clientX, startY: touch.clientY,
    origX: parseInt(el.style.left) || 0, origY: parseInt(el.style.top) || 0,
    el: el
  };
  el.classList.add('dragging');
}, { passive: true });

document.addEventListener('touchmove', function(e) {
  if (!postitDragState) return;
  if (e.touches.length > 1) return;
  var touch = e.touches[0];
  var dx = (touch.clientX - postitDragState.startX) / boardZoom;
  var dy = (touch.clientY - postitDragState.startY) / boardZoom;
  var nx = Math.max(0, postitDragState.origX + dx);
  var ny = Math.max(0, postitDragState.origY + dy);
  postitDragState.el.style.left = nx + 'px';
  postitDragState.el.style.top = ny + 'px';
  updateImprovedConnections();
  e.preventDefault();
}, { passive: false });

document.addEventListener('touchend', function(e) {
  if (!postitDragState) return;
  postitDragState.el.classList.remove('dragging');
  var board = state.boards.find(function(b) { return b.id === Number(postitDragState.boardId); });
  if (board) {
    if (postitDragState.type === 'element') {
      var el = board.elements.find(function(e) { return e.id === Number(postitDragState.elementId); });
      if (el) { el.x = parseInt(postitDragState.el.style.left); el.y = parseInt(postitDragState.el.style.top); }
    } else {
      var p = board.postits.find(function(p) { return p.id === Number(postitDragState.elementId); });
      if (p) { p.x = parseInt(postitDragState.el.style.left); p.y = parseInt(postitDragState.el.style.top); }
    }
  }
  save();
  postitDragState = null;
});

// Right-click context menu on post-its and note cards (PC)


// Capture-phase guard: blocks synthesized click on hl-toggle when palette is open
document.addEventListener('click', function(e) {
  if (e.target.closest('.hl-toggle')) {
    var hp = document.getElementById('hlPalette');
    if (hp && !hp.classList.contains('hidden')) {
      e.stopImmediatePropagation();
    }
  }
}, true);

// Click outside context menu closes it
document.addEventListener('click', function(e) {
  if (!e.target.closest('#contextMenu')) hideContextMenu();
  if (!e.target.closest('#hlPalette') && !e.target.closest('.hl-toggle')) { var hl = document.getElementById('hlPalette'); if (hl) hl.classList.add('hidden'); }
  if (!e.target.closest('#exportPalette') && !e.target.closest('.exp-toggle')) { var exp = document.getElementById('exportPalette'); if (exp) exp.classList.add('hidden'); }
  if (!e.target.closest('.note-table')) {
    if (_activeTableId !== null) { _activeTableId = null; _tableSelection.itemId = null; _tableSelection.cells = []; renderNoteContent(); }
  }
  /* Exit edit mode when clicking outside the element */
  if (_editModeElementId && !e.target.closest('.board-element.editing') && !e.target.closest('.edit-handle')) {
    _exitEditMode();
  }
});

// Click on note links
document.addEventListener('mousedown', function(e) {
  var link = e.target.closest('.note-link, .ext-link');
  if (link) { e.preventDefault(); }
});
document.addEventListener('click', function(e) {
  var link = e.target.closest('.note-link');
  if (link) { e.preventDefault(); e.stopPropagation(); navigateToNoteLink(link.dataset.target); return; }
  link = e.target.closest('.ext-link');
  if (link) { e.preventDefault(); e.stopPropagation(); window.open(link.href, '_blank'); }
});

// Double-click on equations in notes opens editor
document.addEventListener('dblclick', function(e) {
  var katexInline = e.target.closest('.katex-inline');
  var katexBlock = e.target.closest('.katex-block');
  var katexEl = katexInline || katexBlock;
  if (katexEl) {
    e.preventDefault();
    e.stopPropagation();
    var latex = katexEl.getAttribute('data-latex') || '';
    var isBlock = !!katexBlock;
    var itemEl = katexEl.closest('.list-item');
    if (itemEl) {
      var noteId = state.activeNoteId;
      var itemId = Number(itemEl.getAttribute('data-id'));
      openLatexEditor(noteId, itemId, latex, isBlock);
      return;
    }
    /* Handle equations inside post-its */
    var postitEl = katexEl.closest('.postit');
    if (postitEl) {
      var postitId = Number(postitEl.getAttribute('data-id'));
      var board = state.boards.find(function(b) { return b.id === state.activeBoardId; });
      if (board) {
        var p = board.postits.find(function(p) { return p.id === postitId; });
        if (p) {
          openLatexEditorForPostit(state.activeBoardId, postitId, latex, isBlock);
          return;
        }
      }
    }
    return;
  }
  // Double-click on board equation element opens editor
  var boardEqEl = e.target.closest('.board-equation');
  if (boardEqEl) {
    e.preventDefault();
    e.stopPropagation();
    var elId = Number(boardEqEl.getAttribute('data-id'));
    openBoardEquationEditor(state.activeBoardId, elId);
    return;
  }
});

// Long-press on post-its and board elements (Android)
var longPressTimer = null;
// Touch resize for board elements
document.addEventListener('touchstart', function(e) {
  var handle = e.target.closest('.edit-handle');
  if (!handle) return;
  var el = handle.closest('.board-element');
  if (!el) return;
  if (el.dataset.type === 'audio') return;
  var t = e.touches[0];
  _startResize(t.clientX, t.clientY, el, handle.getAttribute('data-dir') || 'se');
  _resizeState.touchId = t.identifier;
  e.preventDefault();
  e.stopPropagation();
}, { passive: false });

document.addEventListener('touchstart', function(e) {
  var postit = e.target.closest('.postit');
  var boardEl = e.target.closest('.board-element');
  if (!postit && !boardEl) return;
  if (postit) {
    if (e.target.closest('.postit-close') || e.target.closest('.postit-color-dot') || e.target.closest('[contenteditable]')) return;
    if (e.target.closest('.postit-header')) return; // let header handle drag
  }
  if (boardEl) {
    if (e.target.closest('.edit-handle, .board-el-close, .audio-player, button')) return;
  }
  var touch = e.touches[0];
  var targetId = postit ? Number(postit.dataset.id) : Number(boardEl.dataset.id);
  var elType = boardEl ? boardEl.dataset.type : null;
  var boardId = state.activeBoardId;
  longPressTimer = setTimeout(function() {
    longPressTimer = null;
    hideContextMenu();
    if (postit) {
      showContextMenu(touch.clientX, touch.clientY, [
        { label: t('connect'), action: function() { contextConnect(targetId); } }
      ]);
    } else {
      var items = [];
      items.push({ label: t('modify'), action: function() { toggleEditMode(boardId, targetId); } });
      items.push({ label: t('connect'), action: function() { contextConnect(targetId); } });
      items.push({ label: t('del'), action: function() { deleteBoardElement(boardId, targetId); } });
      if (elType === 'audio') items.shift();
      showContextMenu(touch.clientX, touch.clientY, items);
    }
  }, 500);
}, { passive: true });

document.addEventListener('touchmove', function(e) {
  if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null; }
  if (_resizeState && _resizeState.touchId !== undefined) {
    /* touch resize active */
    var t = findTouch(e, _resizeState.touchId);
    if (t) {
      _doResize(t.clientX, t.clientY);
      if (e.cancelable) e.preventDefault();
    }
  }
}, { passive: false });

document.addEventListener('touchend', function(e) {
  if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null; }
  if (_resizeState && _resizeState.touchId !== undefined) {
    var t = findTouch(e, _resizeState.touchId);
    if (!t) {
      _endResize();
    }
  }
});

function findTouch(e, id) {
  for (var i = 0; i < e.touches.length; i++) {
    if (e.touches[i].identifier === id) return e.touches[i];
  }
  for (var i = 0; i < e.changedTouches.length; i++) {
    if (e.changedTouches[i].identifier === id) return e.changedTouches[i];
  }
  return null;
}

// Long-press on note cards (Android)
var noteLongPressTimer = null;
var preventCardClick = false;
var folderLongPressTimer = null;

// Long-press on highlight button
var hlLongPressTimer = null;
// Long-press on board cards
var boardLongPressTimer = null;
// Long-press on study set cards
var studyLongPressTimer = null;
// Long-press on study card items
var studyCardLongPressTimer = null;
var fabLongPressTimer = null;
document.addEventListener('touchstart', function(e) {
  var hl = e.target.closest('.hl-toggle');
  if (hl) {
    hlLongPressTimer = setTimeout(function() { hlLongPressTimer = null; toggleHighlightPalette(); }, 500);
    return;
  }
    var card = e.target.closest('.card[data-note-id]');
    if (card) {
      var touch = e.touches[0];
      var noteId = Number(card.dataset.noteId);
      var x = touch.clientX, y = touch.clientY;
      noteLongPressTimer = setTimeout(function() {
        noteLongPressTimer = null;
        hideContextMenu();
        var note = state.notes.find(function(n) { return n.id === noteId; });
        if (!note) return;
        var favLabel = note.favorite ? t('removeFav') : t('addFav');
        var coverLabel = note.cover ? t('removeCover') : t('addCover');
        var items = [
          { label: t('rename'), action: function() { renameNote(noteId); } },
          { label: favLabel, action: function() { toggleFavorite(noteId); } },
          { label: coverLabel, action: function() { if (note.cover) { removeCover(noteId); } else { triggerImportCover(noteId); } } },
          { label: t('exportNote'), action: function() { exportSingleNote(noteId); } }
        ];
        if(note.folderId!=null){
          items.push({ label: t('moveToNotes'), action: function(){ moveNoteToFolder(noteId, null); } });
        } else {
          // offer move to folder if folders exist
          if(state.folders.length>0){
            // quick submenu: we add move to first folder? Instead show dialog to choose
            items.push({ label: t('moveToFolder'), action: function(){ showMoveToFolderDialog(noteId); } });
          }
        }
        items.push({ label: t('del'), action: function() { confirmDeleteNote(noteId); } });
        showContextMenu(x, y, items);
      preventCardClick = true;
      setTimeout(function() { preventCardClick = false; }, 400);
    }, 500);
    return;
  }
  var folderCard = e.target.closest('.card-folder[data-folder-id]');
  if(folderCard){
    var touch = e.touches[0];
    var fid = Number(folderCard.dataset.folderId);
    var x = touch.clientX, y = touch.clientY;
    folderLongPressTimer = setTimeout(function(){
      folderLongPressTimer=null;
      hideContextMenu();
      showContextMenu(x,y,[
        { label: t('rename'), action: function(){ renameFolder(fid); } },
        { label: t('changePassword'), action: function(){ editFolderPassword(fid); } },
        { label: t('del'), action: function(){ confirmDeleteFolder(fid); } }
      ]);
      preventCardClick=true;
      setTimeout(function(){preventCardClick=false;},400);
    },500);
    return;
  }
  var boardCard = e.target.closest('.card[data-board-id]');
  if (boardCard) {
    var touch = e.touches[0];
    var bid = Number(boardCard.dataset.boardId);
    var x = touch.clientX, y = touch.clientY;
    boardLongPressTimer = setTimeout(function() {
      boardLongPressTimer = null;
      hideContextMenu();
      showContextMenu(x, y, [
        { label: t('rename'), action: function() { renameBoard(bid); } },
        { label: t('exportBoard'), action: function() { exportSingleBoard(bid); } },
        { label: t('del'), action: function() { confirmDeleteBoard(bid); } }
      ]);
    }, 500);
    return;
  }
  var studyCard = e.target.closest('.card[data-study-set-id]');
  if (!studyCard) {
    // Study card items long-press
    var scItem = e.target.closest('#studySetCards .study-card-item');
    if (scItem) {
      if (e.target.closest('.card-btn')) return;
      var touch = e.touches[0];
      var sid = state.activeStudySetId;
      var cardId = Number(scItem.dataset.cardId);
      if (!sid) return;
      var x = touch.clientX, y = touch.clientY;
      studyCardLongPressTimer = setTimeout(function() {
        studyCardLongPressTimer = null;
        hideContextMenu();
        showContextMenu(x, y, [
          { label: t('del'), action: function() { deleteStudyCard(sid, cardId); } }
        ]);
      }, 500);
    }
    return;
  }
  if (e.target.closest('.card-btn')) return;
  var touch = e.touches[0];
  var sid = Number(studyCard.dataset.studySetId);
  var x = touch.clientX, y = touch.clientY;
  studyLongPressTimer = setTimeout(function() {
    studyLongPressTimer = null;
    hideContextMenu();
    showContextMenu(x, y, [
      { label: t('rename'), action: function() { renameStudySet(sid); } },
      { label: t('exportStudySet'), action: function() { exportSingleStudySet(sid); } },
      { label: t('del'), action: function() { deleteStudySet(sid); } }
    ]);
  }, 500);
}, { passive: true });

// FAB long-press for import menu (touch)
document.addEventListener('touchstart', function(e) {
  var fab = e.target.closest('#fabBtn');
  if (!fab) return;
  if (fab.classList.contains('hidden')) return;
  fabLongPressTimer = setTimeout(function() {
    fabLongPressTimer = null;
    _fabLongPressed = true;
    showFabMenu();
  }, 500);
}, { passive: true });

document.addEventListener('touchmove', function(e) {
  if (noteLongPressTimer) { clearTimeout(noteLongPressTimer); noteLongPressTimer = null; }
  if (folderLongPressTimer) { clearTimeout(folderLongPressTimer); folderLongPressTimer = null; }
  if (hlLongPressTimer) { clearTimeout(hlLongPressTimer); hlLongPressTimer = null; }
  if (boardLongPressTimer) { clearTimeout(boardLongPressTimer); boardLongPressTimer = null; }
  if (studyLongPressTimer) { clearTimeout(studyLongPressTimer); studyLongPressTimer = null; }
  if (studyCardLongPressTimer) { clearTimeout(studyCardLongPressTimer); studyCardLongPressTimer = null; }
  if (fabLongPressTimer) { clearTimeout(fabLongPressTimer); fabLongPressTimer = null; }
  if (typeof clearRegistroLongPress==='function') clearRegistroLongPress();
}, { passive: true });

document.addEventListener('touchend', function(e) {
  if (noteLongPressTimer) { clearTimeout(noteLongPressTimer); noteLongPressTimer = null; }
  if (folderLongPressTimer) { clearTimeout(folderLongPressTimer); folderLongPressTimer = null; }
  if (hlLongPressTimer) { clearTimeout(hlLongPressTimer); hlLongPressTimer = null; }
  if (boardLongPressTimer) { clearTimeout(boardLongPressTimer); boardLongPressTimer = null; }
  if (studyLongPressTimer) { clearTimeout(studyLongPressTimer); studyLongPressTimer = null; }
  if (studyCardLongPressTimer) { clearTimeout(studyCardLongPressTimer); studyCardLongPressTimer = null; }
  if (fabLongPressTimer) { clearTimeout(fabLongPressTimer); fabLongPressTimer = null; }
  if (typeof clearRegistroLongPress==='function') clearRegistroLongPress();
});

// Context menu via right-click (desktop)
document.addEventListener('contextmenu', function(e){
  var folderCard = e.target.closest('.card-folder[data-folder-id]');
  if(folderCard){
    e.preventDefault();
    var fid=Number(folderCard.dataset.folderId);
    showContextMenu(e.clientX, e.clientY, [
      { label: t('rename'), action: function(){ renameFolder(fid); } },
      { label: t('changePassword'), action: function(){ editFolderPassword(fid); } },
      { label: t('del'), action: function(){ confirmDeleteFolder(fid); } }
    ]);
    return;
  }
  var card = e.target.closest('.card[data-note-id]');
  if(card){
    e.preventDefault();
    var noteId=Number(card.dataset.noteId);
    var note=state.notes.find(function(n){return n.id===noteId;}); if(!note) return;
    var favLabel = note.favorite ? t('removeFav') : t('addFav');
    var coverLabel = note.cover ? t('removeCover') : t('addCover');
    var items=[
      { label: t('rename'), action: function(){ renameNote(noteId); } },
      { label: favLabel, action: function(){ toggleFavorite(noteId); } },
      { label: coverLabel, action: function(){ if(note.cover) removeCover(noteId); else triggerImportCover(noteId); } },
      { label: t('exportNote'), action: function(){ exportSingleNote(noteId); } }
    ];
    if(note.folderId!=null) items.push({ label: t('moveToNotes'), action: function(){ moveNoteToFolder(noteId,null); } });
    else if(state.folders.length>0) items.push({ label: t('moveToFolder'), action: function(){ showMoveToFolderDialog(noteId); } });
    items.push({ label: t('del'), action: function(){ confirmDeleteNote(noteId); } });
    showContextMenu(e.clientX, e.clientY, items);
    return;
  }
});

// Long-press on note detail view removed

// Notes drag
document.addEventListener('mousedown', function(e) {
  var handle = e.target.closest('.drag-handle');
  if (!handle) return;
  var item = handle.closest('.list-item');
  if (!item) return;
  var area = item.closest('.items-area');
  if (!area) return;
  var noteId = area.dataset.noteId;
  if (!noteId) return;
  var note = state.notes.find(function(n) { return n.id == noteId; });
  if (!note) return;
  dragState = { noteId: noteId, itemId: item.dataset.id, note: note, clone: null, lastY: 0, offsetX: 0, offsetY: 0 };
  var noteRect = item.getBoundingClientRect();
  dragState.offsetX = e.clientX - noteRect.left;
  dragState.offsetY = e.clientY - noteRect.top;
  e.preventDefault();
});
// Notes drag touch support
document.addEventListener('touchstart', function(e) {
  var handle = e.target.closest('.drag-handle');
  if (!handle) return;
  var item = handle.closest('.list-item');
  if (!item) return;
  var area = item.closest('.items-area');
  if (!area) return;
  var noteId = area.dataset.noteId;
  if (!noteId) return;
  var note = state.notes.find(function(n) { return n.id == noteId; });
  if (!note) return;
  dragState = { noteId: noteId, itemId: item.dataset.id, note: note, clone: null, lastY: 0, offsetX: 0, offsetY: 0 };
  var noteRect = item.getBoundingClientRect();
  dragState.offsetX = e.touches[0].clientX - noteRect.left;
  dragState.offsetY = e.touches[0].clientY - noteRect.top;
}, { passive: true });

// Card drag (notes, boards, study sets, study cards, folders)
document.addEventListener('mousedown', function(e) {
  var handle = e.target.closest('.card-drag-handle');
  if (!handle) return;
  var card = handle.closest('.card, .study-card-item');
  if (!card) return;
  var grid = card.closest('.selection-grid, .study-set-cards');
  if (!grid) return;
  var type, id, setId = null;
  if (card.dataset.noteId) { type = 'notes'; id = Number(card.dataset.noteId); }
  else if (card.dataset.folderId) { type = 'folders'; id = Number(card.dataset.folderId); }
  else if (card.dataset.boardId) { type = 'boards'; id = Number(card.dataset.boardId); }
  else if (card.dataset.studySetId) { type = 'studySets'; id = Number(card.dataset.studySetId); }
  else if (card.dataset.cardId) { type = 'studyCards'; id = Number(card.dataset.cardId); setId = state.activeStudySetId; }
  else return;
  // detect if dragging inside folder
  if(grid && grid.hasAttribute('data-folder-grid') && type==='notes'){
    type='notesInsideFolder';
  }
  card.classList.add('dragging');
  var rect = card.getBoundingClientRect();
  cardDragState = { el: card, type: type, id: id, setId: setId, clone: null, grid: grid, lastOverId: null, dropFolderId: null, dropToRoot: false, offsetX: e.clientX - rect.left, offsetY: e.clientY - rect.top };
  e.preventDefault();
});

// Card drag touch support
document.addEventListener('touchstart', function(e) {
  var handle = e.target.closest('.card-drag-handle');
  if (!handle) return;
  var card = handle.closest('.card, .study-card-item');
  if (!card) return;
  var grid = card.closest('.selection-grid, .study-set-cards');
  if (!grid) return;
  var type, id, setId = null;
  if (card.dataset.noteId) { type = 'notes'; id = Number(card.dataset.noteId); }
  else if (card.dataset.folderId) { type = 'folders'; id = Number(card.dataset.folderId); }
  else if (card.dataset.boardId) { type = 'boards'; id = Number(card.dataset.boardId); }
  else if (card.dataset.studySetId) { type = 'studySets'; id = Number(card.dataset.studySetId); }
  else if (card.dataset.cardId) { type = 'studyCards'; id = Number(card.dataset.cardId); setId = state.activeStudySetId; }
  else return;
  if(grid && grid.hasAttribute('data-folder-grid') && type==='notes'){
    type='notesInsideFolder';
  }
  card.classList.add('dragging');
  var rect = card.getBoundingClientRect();
  cardDragState = { el: card, type: type, id: id, setId: setId, clone: null, grid: grid, lastOverId: null, dropFolderId: null, dropToRoot: false, offsetX: e.touches[0].clientX - rect.left, offsetY: e.touches[0].clientY - rect.top };
}, { passive: true });

document.addEventListener('touchmove', function(e) {
  if (!cardDragState) return;
  var touch = e.touches[0];
  if (!cardDragState.clone) {
    var orig = cardDragState.el;
    cardDragState.clone = orig.cloneNode(true);
    cardDragState.clone.style.cssText = 'position:fixed;pointer-events:none;z-index:9999;opacity:0.85;width:' + orig.offsetWidth + 'px;background:var(--surface);border:2px solid var(--accent);border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.4);';
    var dh = cardDragState.clone.querySelector('.card-drag-handle');
    if (dh) dh.style.display = 'none';
    document.body.appendChild(cardDragState.clone);
  }
  cardDragState.clone.style.left = (touch.clientX - cardDragState.offsetX) + 'px';
  cardDragState.clone.style.top = (touch.clientY - cardDragState.offsetY) + 'px';
  e.preventDefault();
  // Folder drop detection
  if(cardDragState.type==='notes'){
    // check hover over folder card at root
    var elBelow = document.elementFromPoint(touch.clientX, touch.clientY);
    var folderCard = elBelow ? elBelow.closest('.card-folder[data-folder-id]') : null;
    // clear previous highlight
    document.querySelectorAll('.folder-drop-target').forEach(function(el){ el.classList.remove('folder-drop-target'); });
    if(folderCard && Number(folderCard.dataset.folderId)!==cardDragState.id){
      folderCard.classList.add('folder-drop-target');
      cardDragState.dropFolderId = Number(folderCard.dataset.folderId);
      return;
    } else {
      cardDragState.dropFolderId=null;
    }
  }
  if(cardDragState.type==='notesInsideFolder'){
    var elBelow2 = document.elementFromPoint(touch.clientX, touch.clientY);
    var header = elBelow2 ? elBelow2.closest('header') : null;
    document.querySelectorAll('header.drop-target').forEach(function(el){ el.classList.remove('drop-target'); });
    if(header){
      header.classList.add('drop-target');
      cardDragState.dropToRoot = true;
      return;
    } else {
      cardDragState.dropToRoot=false;
    }
  }
  // clear folder header highlight if not applicable
  if(cardDragState.type!=='notesInsideFolder'){
    document.querySelectorAll('header.drop-target').forEach(function(el){ el.classList.remove('drop-target'); });
  }
  var grid = cardDragState.grid;
  var closestEl = null;
  var closestDist = Infinity;
  var allItems = grid.querySelectorAll('.card, .study-card-item');
  for (var i = 0; i < allItems.length; i++) {
    if (allItems[i] === cardDragState.el || allItems[i].classList.contains('dragging')) continue;
    var rect = allItems[i].getBoundingClientRect();
    var cx = rect.left + rect.width / 2;
    var cy = rect.top + rect.height / 2;
    var dist = Math.sqrt(Math.pow(touch.clientX - cx, 2) + Math.pow(touch.clientY - cy, 2));
    if (dist < closestDist) { closestDist = dist; closestEl = allItems[i]; }
  }
  if (closestEl) {
    var closestId = Number(closestEl.dataset.noteId || closestEl.dataset.boardId || closestEl.dataset.studySetId || closestEl.dataset.cardId || closestEl.dataset.folderId);
    if (closestId !== cardDragState.lastOverId) {
      var crect = closestEl.getBoundingClientRect();
      var midY = crect.top + crect.height / 2;
      if (touch.clientY < midY) grid.insertBefore(cardDragState.el, closestEl);
      else if (closestEl.nextSibling) grid.insertBefore(cardDragState.el, closestEl.nextSibling);
      else grid.appendChild(cardDragState.el);
      cardDragState.lastOverId = closestId;
    }
  }
}, { passive: false });

document.addEventListener('touchend', function(e) {
  if (!cardDragState) return;
  cardDragFinish();
});

document.addEventListener('touchcancel', function(e) {
  if (!cardDragState) return;
  if (cardDragState.el) cardDragState.el.classList.remove('dragging');
  cleanupCardDrag();
});

// Notes drag touch move
document.addEventListener('touchmove', function(e) {
  if (!dragState) return;
  var touch = e.touches[0];
  dragState.lastY = touch.clientY;
  if (!dragState.clone) {
    var orig = document.querySelector('.list-item[data-id="' + dragState.itemId + '"]');
    if (!orig) { cleanupDrag(); return; }
    dragState.clone = orig.cloneNode(true);
    dragState.clone.style.cssText = 'position:fixed;pointer-events:none;z-index:9999;opacity:0.85;width:' + orig.offsetWidth + 'px;background:#3a3a3a;border:1px solid #5b7db5;border-radius:4px;box-shadow:0 8px 24px rgba(0,0,0,0.4);padding:4px;';
    dragState.clone.querySelector('.item-actions').style.display = 'none';
    document.body.appendChild(dragState.clone);
    orig.classList.add('dragging');
  }
  dragState.clone.style.left = (touch.clientX - dragState.offsetX) + 'px';
  dragState.clone.style.top = (touch.clientY - dragState.offsetY) + 'px';
  var itemsArea = document.querySelector('.items-area');
  if (itemsArea) {
    Array.prototype.forEach.call(itemsArea.querySelectorAll('.list-item'), function(el) {
      el.style.borderTop = ''; el.style.borderBottom = '';
      if (el.dataset.id === dragState.itemId) return;
      var rect = el.getBoundingClientRect();
      var mid = rect.top + rect.height / 2;
      if (touch.clientY < mid) el.style.borderTop = '2px solid #5b7db5';
      else el.style.borderBottom = '2px solid #5b7db5';
    });
  }
  e.preventDefault();
}, { passive: false });

// Notes drag touch end
document.addEventListener('touchend', function(e) {
  if (!dragState) return;
  var touchY = dragState.lastY;
  var draggedEl = document.querySelector('.list-item[data-id="' + dragState.itemId + '"]');
  if (draggedEl) draggedEl.classList.remove('dragging');
  var itemsArea = document.querySelector('.items-area');
  if (itemsArea) {
    var items = itemsArea.querySelectorAll('.list-item');
    var targetIdx = -1, after = false;
    for (var i = 0; i < items.length; i++) {
      var el2 = items[i];
      el2.style.borderTop = ''; el2.style.borderBottom = '';
      if (el2.dataset.id === dragState.itemId) continue;
      var rect2 = el2.getBoundingClientRect();
      if (touchY < rect2.top + rect2.height / 2) { targetIdx = i; after = false; break; }
    }
    if (targetIdx === -1) {
      for (var i = items.length - 1; i >= 0; i--) {
        if (items[i].dataset.id !== dragState.itemId) {
          rect2 = items[i].getBoundingClientRect();
          if (touchY >= rect2.top + rect2.height / 2) { targetIdx = i; after = true; break; }
        }
      }
    }
    if (targetIdx >= 0) {
      var note = dragState.note;
      var itemIdNum = Number(dragState.itemId);
      var itemIdx = -1;
      for (var k = 0; k < note.items.length; k++) { if (note.items[k].id === itemIdNum) { itemIdx = k; break; } }
      if (itemIdx >= 0) {
        var item = note.items[itemIdx];
        var others = [];
        for (var k = 0; k < note.items.length; k++) { if (note.items[k].id !== itemIdNum) others.push(note.items[k]); }
        var insertAt = after ? targetIdx + 1 : targetIdx;
        if (insertAt < 0) insertAt = 0;
        if (insertAt > others.length) insertAt = others.length;
        var newItems = [];
        var inserted = false;
        for (var j = 0; j < others.length; j++) {
          if (j === insertAt) { newItems.push(item); inserted = true; }
          newItems.push(others[j]);
        }
        if (!inserted) newItems.push(item);
        note.items = newItems;
        save();
        renderNoteContent();
      }
    }
  }
  cleanupDrag();
});

function cardDragFinish() {
  var draggedEl = cardDragState.el;
  if (draggedEl) draggedEl.classList.remove('dragging');
  // clear folder drop highlights
  document.querySelectorAll('.folder-drop-target').forEach(function(el){ el.classList.remove('folder-drop-target'); });
  document.querySelectorAll('header.drop-target').forEach(function(el){ el.classList.remove('drop-target'); });
  // Handle dropping note onto folder (touch and mouse)
  if(cardDragState.type==='notes' && cardDragState.dropFolderId!=null){
    var folder=getFolderById(cardDragState.dropFolderId);
    var noteId=cardDragState.id;
    var dropId=cardDragState.dropFolderId;
    cleanupCardDrag();
    if(folder){
      if(folder.pwdHash && !unlockedIds['f'+dropId]){
        pendingFolderDrop={noteId:noteId, folderId:dropId};
        pendingUnlock={type:'folder', id:dropId, action:'drop'};
        document.getElementById('unlockPwdInput').value='';
        document.getElementById('unlockTitle').textContent=t('protectedFolder')+folder.name;
        showDialog('unlockDialog');
        setTimeout(function(){document.getElementById('unlockPwdInput').focus();},100);
        return;
      }
      moveNoteToFolder(noteId, dropId);
    }
    return;
  }
  if(cardDragState.type==='notesInsideFolder' && cardDragState.dropToRoot){
    var nid=cardDragState.id;
    cleanupCardDrag();
    moveNoteToFolder(nid, null);
    return;
  }
  if(cardDragState.type==='notesInsideFolder'){
    // reorder inside folder: orderedIds from grid
    var grid = cardDragState.grid;
    var items = grid.querySelectorAll('.card[data-note-id]');
    var orderedIds=[];
    for(var i=0;i<items.length;i++){ var nid2=Number(items[i].dataset.noteId); if(!isNaN(nid2)) orderedIds.push(nid2); }
    // rebuild state.notes order for those notes in this folder
    var folderId = Number(grid.getAttribute('data-folder-grid'));
    var otherNotes = state.notes.filter(function(n){ return n.folderId!==folderId; });
    var inFolderMap={}; state.notes.forEach(function(n){ if(n.folderId===folderId) inFolderMap[n.id]=n; });
    var newInFolder=[]; orderedIds.forEach(function(id){ if(inFolderMap[id]) newInFolder.push(inFolderMap[id]); });
    // append any missing (should not)
    state.notes.forEach(function(n){ if(n.folderId===folderId && orderedIds.indexOf(n.id)===-1) newInFolder.push(n); });
    // reconstruct state.notes preserving otherNotes order, inserting newInFolder in place? Simplest: rebuild as otherNotes + newInFolder at original position?
    // Instead, keep global order: we will splice newInFolder maintaining relative order among themselves, but keep other notes positions
    // Simplistic: create newNotes = []; iterate original state.notes, replace folder notes segment with newInFolder in order
    // For now, just reorder globally as otherNotes concatenated with newInFolder (stable)
    // Better: keep state.notes filtered: otherNotes + newInFolder, but that moves folder notes to end. Instead reorder by mapping.
    // Create newNotes where folder notes appear in orderedIds order, keeping original interleaving positions of folder notes
    var newNotes=[];
    var idxFolder=0;
    state.notes.forEach(function(n){
      if(n.folderId===folderId){
        if(idxFolder<newInFolder.length) newNotes.push(newInFolder[idxFolder++]);
      } else {
        newNotes.push(n);
      }
    });
    state.notes=newNotes;
    save(); renderAll();
    cleanupCardDrag();
    return;
  }
  var grid = cardDragState.grid;
  var isRootGrid = grid && grid.id==='rootGrid';
  var items = grid.querySelectorAll('.card, .study-card-item');
  var orderedIds = [];
  for (var i = 0; i < items.length; i++) {
    var id = Number(items[i].dataset.noteId || items[i].dataset.boardId || items[i].dataset.studySetId || items[i].dataset.cardId || items[i].dataset.folderId);
    if (!isNaN(id)) orderedIds.push(id);
  }
  var arr;
  if (cardDragState.type === 'notes' && isRootGrid) {
    // reorder rootOrder, not state.notes
    var newOrder=[];
    orderedIds.forEach(function(id){
      // find entry in rootOrder by id, determine type by matching data attribute? need to infer
      // we check if this id corresponds to folder
      var isFolder = !!state.folders.find(function(f){return f.id===id;});
      // but if both note and folder share id (unlikely but possible), prefer checking DOM element
      // We can look at original rootOrder mapping: build map
    });
    // Build map of current rootOrder by key
    var map={}; state.rootOrder.forEach(function(e){ map[e.type+':'+e.id]=e; });
    // Need to know type for each orderedId: inspect DOM element at position i
    var domTypes=[];
    for(var i=0;i<items.length;i++){
      if(items[i].dataset.noteId) domTypes.push('note');
      else if(items[i].dataset.folderId) domTypes.push('folder');
      else if(items[i].dataset.boardId) domTypes.push('board');
      else if(items[i].dataset.studySetId) domTypes.push('studySet');
      else if(items[i].dataset.cardId) domTypes.push('studyCards');
    }
    for(var k=0;k<orderedIds.length;k++){
      var t=domTypes[k];
      if(t==='note' || t==='folder'){
        var key=t+':'+orderedIds[k];
        if(map[key]) newOrder.push(map[key]);
      }
    }
    // append missing (should not)
    state.rootOrder.forEach(function(e){ if(!newOrder.find(function(x){return x.type===e.type&&x.id===e.id;})) newOrder.push(e); });
    state.rootOrder=newOrder;
    // also need to keep state.notes order in sync for root notes? No, rootOrder is source for root display, notes order remains for folder internal.
    save(); renderAll();
    cleanupCardDrag();
    return;
  }
  if (cardDragState.type === 'notes' && !isRootGrid) {
    // fallback old behavior for non-root (should not happen as inside folder handled above)
    arr = state.notes;
  } else if (cardDragState.type === 'folders' && isRootGrid) {
    // same as root reorder for folders
    var newOrder2=[];
    var map2={}; state.rootOrder.forEach(function(e){ map2[e.type+':'+e.id]=e; });
    var domTypes2=[];
    for(var i=0;i<items.length;i++){
      if(items[i].dataset.noteId) domTypes2.push('note');
      else if(items[i].dataset.folderId) domTypes2.push('folder');
      else continue;
    }
    for(var k=0;k<orderedIds.length;k++){
      var t=domTypes2[k];
      if(t==='note' || t==='folder'){
        var key=t+':'+orderedIds[k];
        if(map2[key]) newOrder2.push(map2[key]);
      }
    }
    state.rootOrder.forEach(function(e){ if(!newOrder2.find(function(x){return x.type===e.type&&x.id===e.id;})) newOrder2.push(e); });
    state.rootOrder=newOrder2;
    save(); renderAll();
    cleanupCardDrag();
    return;
  } else if (cardDragState.type === 'boards') arr = state.boards;
  else if (cardDragState.type === 'studySets') arr = state.studySets;
  else if (cardDragState.type === 'studyCards') {
    var set = state.studySets.find(function(s) { return s.id === cardDragState.setId; });
    if (set) arr = set.cards;
  }
  if (arr) {
    var itemMap = {};
    for (var k = 0; k < arr.length; k++) itemMap[arr[k].id] = arr[k];
    var newArr = [];
    for (var k = 0; k < orderedIds.length; k++) {
      if (itemMap[orderedIds[k]]) newArr.push(itemMap[orderedIds[k]]);
    }
    if (cardDragState.type === 'boards') state.boards = newArr;
    else if (cardDragState.type === 'studySets') state.studySets = newArr;
    else if (cardDragState.type === 'studyCards' && set) set.cards = newArr;
    else if (cardDragState.type === 'notes' && !isRootGrid){
      // legacy fallback
      state.notes = newArr;
    }
    save();
    renderAll();
  }
  cleanupCardDrag();
}

document.addEventListener('mousemove', function(e) {
  if (dragState) {
    if (!dragState.clone) {
      var orig = document.querySelector('.list-item[data-id="' + dragState.itemId + '"]');
      if (!orig) { cleanupDrag(); return; }
      dragState.clone = orig.cloneNode(true);
      dragState.clone.style.cssText = 'position:fixed;pointer-events:none;z-index:9999;opacity:0.85;width:' + orig.offsetWidth + 'px;background:#3a3a3a;border:1px solid #5b7db5;border-radius:4px;box-shadow:0 8px 24px rgba(0,0,0,0.4);padding:4px;';
      dragState.clone.querySelector('.item-actions').style.display = 'none';
      document.body.appendChild(dragState.clone);
      orig.classList.add('dragging');
    }
    dragState.clone.style.left = (e.clientX - dragState.offsetX) + 'px';
    dragState.clone.style.top = (e.clientY - dragState.offsetY) + 'px';
    var itemsArea = document.querySelector('.items-area');
    if (itemsArea) {
      Array.prototype.forEach.call(itemsArea.querySelectorAll('.list-item'), function(el) {
        el.style.borderTop = ''; el.style.borderBottom = '';
        if (el.dataset.id === dragState.itemId) return;
        var rect = el.getBoundingClientRect();
        var mid = rect.top + rect.height / 2;
        if (e.clientY < mid) el.style.borderTop = '2px solid #5b7db5';
        else el.style.borderBottom = '2px solid #5b7db5';
      });
    }
  }
  if (cardDragState) {
    if (!cardDragState.clone) {
      var orig = cardDragState.el;
      cardDragState.clone = orig.cloneNode(true);
      cardDragState.clone.style.cssText = 'position:fixed;pointer-events:none;z-index:9999;opacity:0.85;width:' + orig.offsetWidth + 'px;background:var(--surface);border:2px solid var(--accent);border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.4);';
      var dh = cardDragState.clone.querySelector('.card-drag-handle');
      if (dh) dh.style.display = 'none';
      document.body.appendChild(cardDragState.clone);
      orig.classList.add('dragging');
    }
    cardDragState.clone.style.left = (e.clientX - cardDragState.offsetX) + 'px';
    cardDragState.clone.style.top = (e.clientY - cardDragState.offsetY) + 'px';
    // Folder drop detection (desktop)
    if(cardDragState.type==='notes'){
      var elBelow = document.elementFromPoint(e.clientX, e.clientY);
      var folderCard = elBelow ? elBelow.closest('.card-folder[data-folder-id]') : null;
      document.querySelectorAll('.folder-drop-target').forEach(function(el){ el.classList.remove('folder-drop-target'); });
      if(folderCard && Number(folderCard.dataset.folderId)!==cardDragState.id){
        folderCard.classList.add('folder-drop-target');
        cardDragState.dropFolderId = Number(folderCard.dataset.folderId);
        return;
      } else {
        cardDragState.dropFolderId=null;
      }
    }
    if(cardDragState.type==='notesInsideFolder'){
      var elBelow2 = document.elementFromPoint(e.clientX, e.clientY);
      var header = elBelow2 ? elBelow2.closest('header') : null;
      document.querySelectorAll('header.drop-target').forEach(function(el){ el.classList.remove('drop-target'); });
      if(header){
        header.classList.add('drop-target');
        cardDragState.dropToRoot = true;
        return;
      } else {
        cardDragState.dropToRoot=false;
      }
    }
    if(cardDragState.type!=='notesInsideFolder'){
      document.querySelectorAll('header.drop-target').forEach(function(el){ el.classList.remove('drop-target'); });
    }
    var grid = cardDragState.grid;
    var closestEl = null;
    var closestDist = Infinity;
    var allItems = grid.querySelectorAll('.card, .study-card-item');
    for (var i = 0; i < allItems.length; i++) {
      if (allItems[i] === cardDragState.el || allItems[i].classList.contains('dragging')) continue;
      var rect = allItems[i].getBoundingClientRect();
      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;
      var dist = Math.sqrt(Math.pow(e.clientX - cx, 2) + Math.pow(e.clientY - cy, 2));
      if (dist < closestDist) { closestDist = dist; closestEl = allItems[i]; }
    }
    if (closestEl) {
      var closestId = Number(closestEl.dataset.noteId || closestEl.dataset.boardId || closestEl.dataset.studySetId || closestEl.dataset.cardId || closestEl.dataset.folderId);
      if (closestId !== cardDragState.lastOverId) {
        var crect = closestEl.getBoundingClientRect();
        var midY = crect.top + crect.height / 2;
        if (e.clientY < midY) grid.insertBefore(cardDragState.el, closestEl);
        else if (closestEl.nextSibling) grid.insertBefore(cardDragState.el, closestEl.nextSibling);
        else grid.appendChild(cardDragState.el);
        cardDragState.lastOverId = closestId;
      }
    }
  }
});

document.addEventListener('mouseup', function(e) {
  if (dragState) {
    var draggedEl = document.querySelector('.list-item[data-id="' + dragState.itemId + '"]');
    if (draggedEl) draggedEl.classList.remove('dragging');
    var itemsArea = document.querySelector('.items-area');
    if (itemsArea) {
      var items = itemsArea.querySelectorAll('.list-item');
      var targetIdx = -1, after = false;
      for (var i = 0; i < items.length; i++) {
        var el2 = items[i];
        el2.style.borderTop = ''; el2.style.borderBottom = '';
        if (el2.dataset.id === dragState.itemId) continue;
        var rect2 = el2.getBoundingClientRect();
        if (e.clientY < rect2.top + rect2.height / 2) { targetIdx = i; after = false; break; }
      }
      if (targetIdx === -1) {
        for (var i = items.length - 1; i >= 0; i--) {
          if (items[i].dataset.id !== dragState.itemId) {
            rect2 = items[i].getBoundingClientRect();
            if (e.clientY >= rect2.top + rect2.height / 2) { targetIdx = i; after = true; break; }
          }
        }
      }
      if (targetIdx >= 0) {
        var note = dragState.note;
        var itemIdNum = Number(dragState.itemId);
        var itemIdx = -1;
        for (var k = 0; k < note.items.length; k++) { if (note.items[k].id === itemIdNum) { itemIdx = k; break; } }
        if (itemIdx >= 0) {
          var item = note.items[itemIdx];
          var others = [];
          for (var k = 0; k < note.items.length; k++) { if (note.items[k].id !== itemIdNum) others.push(note.items[k]); }
          var insertAt = after ? targetIdx + 1 : targetIdx;
          if (insertAt < 0) insertAt = 0;
          if (insertAt > others.length) insertAt = others.length;
          var newItems = [];
          var inserted = false;
          for (var j = 0; j < others.length; j++) {
            if (j === insertAt) { newItems.push(item); inserted = true; }
            newItems.push(others[j]);
          }
          if (!inserted) newItems.push(item);
          note.items = newItems;
          save();
          renderNoteContent();
        }
      }
    }
    cleanupDrag();
  }
  if (cardDragState) {
    cardDragFinish();
  }
});

function cleanupDrag() {
  if (dragState && dragState.clone) dragState.clone.remove();
  dragState = null;
  document.body.style.cursor = '';
}

function cleanupCardDrag() {
  if (cardDragState && cardDragState.clone) cardDragState.clone.remove();
  cardDragState = null;
}

// Deteccion de Android para ajustar por barra de estado
if (/android/i.test(navigator.userAgent)) {
  document.documentElement.classList.add('android');
  var sb = window.AndroidBridge && window.AndroidBridge.getStatusBarHeight ? Number(window.AndroidBridge.getStatusBarHeight()) : 0;
  if (!sb) sb = 24;
  document.documentElement.style.setProperty('--status-bar-h', sb + 'px');
}

// Init
load();
state.notes.forEach(function(n) { if (typeof n.id === 'string') n.id = Number(n.id); if (!n.cover) n.cover = ''; if (!n.events) n.events = []; if (!n.tasks) n.tasks = []; n.events = n.events.filter(function(e){ return e.repetition !== 'daily'; }); n.tasks = n.tasks.filter(function(t){ return t.repetition !== 'daily'; }); if (n.items) n.items.forEach(function(i) { if (typeof i.id === 'string') i.id = Number(i.id); }); });
if (!state.habits) state.habits = [];
state.notes.forEach(function(n) {
  if (n.diary) {
    var p = n.title.split('-').map(Number);
    if (p.length === 3) {
      var noteDate = new Date(p[2], p[1] - 1, p[0]).getTime();
      (n.events || []).forEach(function(e) { e.createdAt = noteDate; });
      (n.tasks || []).forEach(function(t) { t.createdAt = noteDate; });
    }
  }
});
state.boards.forEach(function(b) {
  if (typeof b.id === 'string') b.id = Number(b.id);
  if (b.postits) b.postits.forEach(function(p) { if (typeof p.id === 'string') p.id = Number(p.id); });
});
state.studySets.forEach(function(s) {
  if (typeof s.id === 'string') s.id = Number(s.id);
  if (!s.cards) s.cards = [];
  if (s.cards) s.cards.forEach(function(c) { if (typeof c.id === 'string') c.id = Number(c.id); });
});
if (typeof state.activeNoteId === 'string') state.activeNoteId = Number(state.activeNoteId);
if (typeof state.activeBoardId === 'string') state.activeBoardId = Number(state.activeBoardId);
if (typeof state.activeStudySetId === 'string') state.activeStudySetId = Number(state.activeStudySetId);
// Migrar hábitos: asegurar campos y filtrar datos inválidos
state.habits.forEach(function(h){ if(!h.uuid) h.uuid = generateUUID(); if(h.current==null) h.current=0; if(!h.status) h.status='pending'; if(h.streak==null) h.streak=0; if(!h.lastProcessedDate) h.lastProcessedDate=getDateStr(new Date()); if(!h.history) h.history=[]; if(h.total!=null) h.total=Number(h.total); if(h.step!=null) h.step=Number(h.step); if(h.type==='counter' && (h.total==null||h.step==null)){ h.type='task'; } });
// Migrar carpetas en Init (por si load no se ejecutó completo)
if(!state.folders) state.folders=[];
if(state.activeFolderId===undefined) state.activeFolderId=null;
if(!state.rootOrder) state.rootOrder=[];
state.notes.forEach(function(n){ if(n.folderId===undefined) n.folderId=null; });
state.folders.forEach(function(f){ if(typeof f.id==='string') f.id=Number(f.id); });
if(typeof state.activeFolderId==='string') state.activeFolderId=Number(state.activeFolderId)||null;
if(state.activeFolderId!=null && !state.folders.find(function(f){return f.id===state.activeFolderId;})) state.activeFolderId=null;
ensureRootOrder();
// Al reabrir tras cierre completo, siempre arrancar en Notas (no dentro de nota/tablero protegido)
state.view = 'notes';
state.activeNoteId = null;
state.activeBoardId = null;
state.activeStudySetId = null;
state.activeFolderId = null;
if (typeof window._studyingSetId !== 'undefined') window._studyingSetId = null;
save();
processHabitsDayChange();
renderAll();
applyTheme();
applyLang();
document.documentElement.lang = state.lang || 'en';

ImageManager.init().then(function() {
  ImageManager.cleanupOrphans();
  /* Migrar portadas legacy (data URLs en localStorage) al filesystem */
  state.notes.forEach(function(n) {
    if (n.cover && n.cover.indexOf('ref:') !== 0 && n.cover.indexOf('data:') === 0) {
      var legacyB64 = n.cover.indexOf('base64,') >= 0 ? n.cover.split('base64,')[1] : n.cover.split(',')[1];
      if (legacyB64) {
        var newRef = 'imagenes/cover-' + n.id + '-' + generateImageId() + '.webp';
        ImageManager.save(newRef, legacyB64).then(function() {
          n.cover = 'ref:' + newRef;
          save();
          renderAll();
        }).catch(function(err) {
          console.warn('Cover migration failed:', newRef, err);
        });
      }
    }
  });
  /* Migrar imágenes embebidas (data URLs) de tarjetas de estudio al filesystem */
  var studyCardMigration = [];
  state.studySets.forEach(function(set) {
    (set.cards || []).forEach(function(card) {
      ['front', 'back'].forEach(function(side) {
        var html = card[side] || '';
        var imgs = html.match(/<img[^>]*src="data:[^"]*"[^>]*>/g) || [];
        imgs.forEach(function(tag) {
          var m = tag.match(/src="data:[^;]+;base64,([^"]+)"/);
          if (!m || !m[1]) return;
          var ref = 'imagenes/sc-' + set.id + '-' + generateImageId() + '.webp';
          studyCardMigration.push(ImageManager.save(ref, m[1]).then(function() {
            var newTag = tag.replace(/\ssrc="data:[^"]*"/, ' data-ref="' + ref + '"');
            if (html.indexOf(tag) !== -1) html = html.replace(tag, newTag);
          }));
        });
        card[side] = html;
      });
    });
  });
  Promise.all(studyCardMigration).then(function() { save(); }).catch(function(err) { console.warn('Study card image migration error:', err); });
}).catch(function(e) {
  console.warn('ImageManager init error:', e);
});

if (state.firstVisit) {
  showDialog('welcomeDialog');
}

/* Verificar notificaciones al iniciar */
processHabitsDayChange();
checkTodayNotifications();
checkHabitNotifications();
updateSettingsToggleStates();

/* Comprobar notificaciones y cambio de día periódicamente cada 60 segundos */
setInterval(function() { processHabitsDayChange(); checkTodayNotifications(); checkHabitNotifications(); }, 60000);

/* Volver a verificar al reanudar la app */
document.addEventListener('visibilitychange', function() {
  if (!document.hidden) { processHabitsDayChange(); checkTodayNotifications(); checkHabitNotifications(); }
});

function toggleMenu() {
  hideContextMenu();
  document.getElementById('menuOverlay').classList.toggle('open');
  document.getElementById('menuSidebar').classList.toggle('open');
  var overlay = document.getElementById('menuOverlay');
  var menu = document.getElementById('contextMenu');
  if (overlay && menu && !menu.classList.contains('hidden')) {
    overlay.classList.add('open');
  }
}
var _fabLongPressed = false;
function fabClick() {
  if (_fabLongPressed) { _fabLongPressed = false; return; }
  if (state.view === 'board') showNewBoardDialog();
  else if (state.view === 'diary') openTodayDiary();
  else if (state.view === 'habits') openHabitDialog('task');
  else if (state.view === 'registros') {
    if (state.activeRegistroId) { editRegistro(state.activeRegistroId); return; }
    openRegistroDialog();
  }
  else if (state.view === 'study') {
    if (state.activeStudySetId) showAddStudyCard(state.activeStudySetId);
    else showNewStudySetDialog();
  }
  else showNewNoteDialog();
}
function showFabMenu() {
  hideContextMenu();
  var items = getFabMenuItems();
  if (items.length === 0) return;
  var fab = document.getElementById('fabBtn');
  if (!fab) return;
  var rect = fab.getBoundingClientRect();
  showContextMenu(Math.max(8, rect.left - 150), Math.max(8, rect.top - 80), items);
  _fabLongPressed = true;
}
function getFabMenuItems() {
  if (state.view === 'board')
    return [{ label: t('import'), action: function() { document.getElementById('importSingleInput').click(); } }];
  if (state.view === 'study') {
    if (state.activeStudySetId) return [];
    return [{ label: t('import'), action: function() { document.getElementById('importSingleInput').click(); } }];
  }
  if (state.view === 'diary') return [];
  if (state.view === 'habits') return [{ label: t('habitTask'), action: function(){ openHabitDialog('task'); } }, { label: t('habitCounter'), action: function(){ openHabitDialog('counter'); } }];
  if (state.view === 'registros') return [{ label: t('import'), action: function() { document.getElementById('importSingleInput').click(); } }];
  return [{ label: t('import'), action: function() { document.getElementById('importSingleInput').click(); } }];
}
function updateFab() {
  var fab = document.getElementById('fabBtn');
  if (!fab) return;
  var inStudying = window._studyingSetId != null;
  var insideItem = (state.view === 'notes' && state.activeNoteId) || (state.view === 'board' && state.activeBoardId) || (state.view === 'diary' && state.activeNoteId);
  // inside folder still shows FAB
  if (state.view==='notes' && state.activeFolderId!=null && !state.activeNoteId) insideItem=false;
  if (inStudying) { fab.classList.add('hidden'); return; }
  var diaryCalendar = state.view === 'diary' && !state.activeNoteId;
  if (state.view === 'habits') { fab.classList.remove('hidden'); fab.className = 'fab fab-add'; return; }
  if (state.view === 'registros') {
    var inRegistroDetail = !!state.activeRegistroId;
    fab.classList.remove('hidden');
    fab.className = 'fab';
    if (inRegistroDetail) document.body.classList.add('registro-edit-mode');
    else document.body.classList.remove('registro-edit-mode');
    return;
  }
  fab.classList.toggle('hidden', (state.view !== 'notes' && state.view !== 'board' && state.view !== 'diary' && state.view !== 'study') || insideItem || diaryCalendar);
  document.body.classList.remove('registro-edit-mode');
  if (state.view !== 'habits') fab.className = 'fab fab-add';
}
function updateTableFab() {
  var fab = document.getElementById('tableFabBtn');
  if (!fab) return;
  var show = _activeTableId && _tableSelection.itemId && _tableSelection.cells.length > 0;
  if (show) {
    if (_tableSelection.cells.length >= 2) {
      fab.textContent = t('mergeCells');
      fab.onclick = function() {
        var note = state.notes.find(function(n) { return n.id === state.activeNoteId; });
        if (!note) return;
        var item = note.items.find(function(i) { return i.id === _tableSelection.itemId; });
        if (item) mergeSelectedCells(state.activeNoteId, item.id);
      };
    } else {
      var note = state.notes.find(function(n) { return n.id === state.activeNoteId; });
      var item = note ? note.items.find(function(i) { return i.id === _tableSelection.itemId; }) : null;
      if (item && item.cells) {
        var cell = item.cells[_tableSelection.cells[0]];
        if (cell && (cell.rowspan > 1 || cell.colspan > 1)) {
          fab.textContent = t('splitCell');
          fab.onclick = function() { splitTableCells(state.activeNoteId, item.id); };
        } else { show = false; }
      } else { show = false; }
    }
  }
  fab.classList.toggle('hidden', !show);
}
function showSettings() {
  var sel = document.getElementById('settingsLangSelect');
  if (sel) sel.value = state.lang || 'en';
  renderDiaryPwdSection();
  updateSettingsToggleStates();
  showDialog('settingsDialog');
}

function closeMenu() {
  document.getElementById('menuSidebar').classList.remove('open');
  var menu = document.getElementById('contextMenu');
  var menuHidden = !menu || menu.classList.contains('hidden');
  if (menuHidden) {
    document.getElementById('menuOverlay').classList.remove('open');
  }
}

function switchView(view) {
  hideContextMenu();
  clearCurrentUnlock();
  _activeTableId = null; _tableSelection.itemId = null; _tableSelection.cells = [];
  if (state.view === 'diary' && view !== 'diary') diaryUnlocked = false;
  if (view === 'notes') { state.activeNoteId = null; state.activeFolderId=null; }
  if (view === 'board') state.activeBoardId = null;
  if (view === 'diary') {
    if (!diaryUnlockFlow()) return;
    state.activeNoteId = null;
    resetDiaryCalendarToToday();
  }
  if (view === 'registros') {
    // No limpiar activeRegistroId al entrar a lista; solo si ya estaba en detalle y cambia a otro view, se mantiene
  } else {
    // Si sale de registros, no limpiar filtro
  }
  state.view = view;
  var inDiaryNote = view === 'diary' && state.activeNoteId;
  document.getElementById('panelNotes').classList.toggle('hidden', view !== 'notes' && !inDiaryNote);
  document.getElementById('panelDiary').classList.toggle('hidden', view !== 'diary' || inDiaryNote);
  document.getElementById('panelBoard').classList.toggle('hidden', view !== 'board');
  document.getElementById('panelStudy').classList.toggle('hidden', view !== 'study');
  document.getElementById('panelCafecito').classList.toggle('hidden', view !== 'cafecito');
  document.getElementById('panelTrash').classList.toggle('hidden', view !== 'trash');
  var hp = document.getElementById('panelHabits');
  if (hp) hp.classList.toggle('hidden', view !== 'habits');
  var rp = document.getElementById('panelRegistros');
  if (rp) rp.classList.toggle('hidden', view !== 'registros');
  document.getElementById('menuNotes').classList.toggle('active', view === 'notes');
  document.getElementById('menuBoard').classList.toggle('active', view === 'board');
  var dm = document.getElementById('menuDiary');
  if (dm) dm.classList.toggle('active', view === 'diary');
  var sm = document.getElementById('menuStudy');
  if (sm) sm.classList.toggle('active', view === 'study');
  var cm = document.getElementById('menuCafecito');
  if (cm) cm.classList.toggle('active', view === 'cafecito');
  var tm = document.getElementById('menuTrash');
  if (tm) tm.classList.toggle('active', view === 'trash');
  var hm = document.getElementById('menuHabits');
  if (hm) hm.classList.toggle('active', view === 'habits');
  var rm = document.getElementById('menuRegistros');
  if (rm) rm.classList.toggle('active', view === 'registros');
  updateFab();
  save();
  if (view === 'diary') { renderDiaryView(); }
  else if (view === 'board') { renderBoardContent(); }
  else if (view === 'study') { renderStudyContent(); }
  else if (view === 'cafecito') { renderCafecitoContent(); }
  else if (view === 'trash') { renderTrashContent(); }
  else if (view === 'habits') { processHabitsDayChange(); renderHabitsView(); }
  else if (view === 'registros') { renderRegistrosView(); }
  else { renderNoteContent(); }
}

function renderAll() {
  renderNoteContent();
  renderBoardContent();
  renderStudyContent();
  renderCafecitoContent();
  var view = state.view || 'notes';
  var inDiaryNote = view === 'diary' && state.activeNoteId;
  document.getElementById('panelNotes').classList.toggle('hidden', view !== 'notes' && !inDiaryNote);
  document.getElementById('panelDiary').classList.toggle('hidden', view !== 'diary' || inDiaryNote);
  document.getElementById('panelBoard').classList.toggle('hidden', view !== 'board');
  document.getElementById('panelStudy').classList.toggle('hidden', view !== 'study');
  document.getElementById('panelCafecito').classList.toggle('hidden', view !== 'cafecito');
  document.getElementById('panelTrash').classList.toggle('hidden', view !== 'trash');
  var hp = document.getElementById('panelHabits');
  if (hp) hp.classList.toggle('hidden', view !== 'habits');
  var rp = document.getElementById('panelRegistros');
  if (rp) rp.classList.toggle('hidden', view !== 'registros');
  renderTrashContent();
  if (view === 'habits') renderHabitsView();
  if (view === 'registros') renderRegistrosView();
  document.getElementById('menuNotes').classList.toggle('active', view === 'notes');
  document.getElementById('menuBoard').classList.toggle('active', view === 'board');
  var dm = document.getElementById('menuDiary');
  if (dm) dm.classList.toggle('active', view === 'diary');
  var sm = document.getElementById('menuStudy');
  if (sm) sm.classList.toggle('active', view === 'study');
  var cm = document.getElementById('menuCafecito');
  if (cm) cm.classList.toggle('active', view === 'cafecito');
  var tm = document.getElementById('menuTrash');
  if (tm) tm.classList.toggle('active', view === 'trash');
  var hm = document.getElementById('menuHabits');
  if (hm) hm.classList.toggle('active', view === 'habits');
  var rm = document.getElementById('menuRegistros');
  if (rm) rm.classList.toggle('active', view === 'registros');
  updateFab();
  if (view === 'diary' && !state.activeNoteId) renderDiaryCalendar();
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeMenu();
    closeDialog('newNoteDialog');
    closeDialog('newBoardDialog');
    closeDialog('unlockDialog'); closeDialog('settingsDialog');
    closeDialog('fullsizeOverlay');
    closeDialog('habitDialog');
    closeDialog('habitDeleteDialog');
    closeDialog('registroDialog');
    closeDialog('registroDeleteDialog');
    pendingUnlock = null; pendingDelete = null;
    clearHabitHold();
    clearHabitLongPress();
    clearRegistroLongPress();
    cancelConnect();
    _exitEditMode();
    hideContextMenu();
    cleanupDrag();
  }
  // Enter in note items
  if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
    var el = e.target;
    if (el && el.classList && el.classList.contains('item-text') && el.isContentEditable) {
      if (el.closest('.list-item.text')) return; // text item: let default (new line)
      var sel = window.getSelection();
      var node = sel && sel.anchorNode;
      if (node) {
        if (node.nodeType === 3) node = node.parentNode;
        if (node.closest('li')) return;
      }
      e.preventDefault();
      var note = state.notes.find(function(n) { return n.id === state.activeNoteId; });
      if (!note) return;
      var idx = -1;
      note.items.forEach(function(item, i) { if (item.id === activeItemId) idx = i; });
      if (idx >= 0) {
        var curItem = note.items[idx];
        var sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
          var range = sel.getRangeAt(0);
          var preRange = document.createRange();
          preRange.setStart(el, 0);
          preRange.setEnd(range.startContainer, range.startOffset);
          var postRange = document.createRange();
          postRange.setStart(range.startContainer, range.startOffset);
          postRange.setEnd(el, el.childNodes.length);
          var beforeDiv = document.createElement('div');
          beforeDiv.appendChild(preRange.cloneContents());
          var afterDiv = document.createElement('div');
          afterDiv.appendChild(postRange.cloneContents());
          curItem.text = unparseNoteLinks(beforeDiv.innerHTML);
          var newItem = { id: genId(), text: unparseNoteLinks(afterDiv.innerHTML), checked: false, level: curItem.level, type: 'list' };
          note.items.splice(idx + 1, 0, newItem);
        } else {
          var newItem = { id: genId(), text: '', checked: false, level: curItem.level, type: 'list' };
          note.items.splice(idx + 1, 0, newItem);
        }
        save();
        renderNoteContent();
        var newIdx = idx + 1;
        var items = document.querySelectorAll('.list-item .item-text[contenteditable]');
        if (items.length > newIdx && newIdx >= 0) { items[newIdx].focus(); placeCaretAtEnd(items[newIdx]); }
      }
    }
  }
  // Backspace on empty item
  if (e.key === 'Backspace') {
    var el = e.target;
    if (el && el.classList && el.classList.contains('item-text') && el.isContentEditable) {
      if (el.textContent.trim() === '') {
        e.preventDefault();
        var note = state.notes.find(function(n) { return n.id === state.activeNoteId; });
        if (!note) return;
        var idx = -1;
        note.items.forEach(function(item, i) { if (item.id === activeItemId) idx = i; });
        if (idx > 0) {
          var prevId = note.items[idx - 1].id;
          deleteItem(state.activeNoteId, activeItemId);
          setTimeout(function() {
            var prevItem = document.querySelector('.list-item[data-id="' + prevId + '"]');
            if (prevItem) {
              var prevText = prevItem.querySelector('.item-text[contenteditable]');
              if (prevText) { prevText.focus(); placeCaretAtEnd(prevText); }
            }
          }, 10);
        }
      }
    }
  }
  // Format shortcuts
  if (e.ctrlKey && (e.key === 'b' || e.key === 'B')) { e.preventDefault(); formatBold(); }
  if (e.ctrlKey && (e.key === 'i' || e.key === 'I')) { e.preventDefault(); formatItalic(); }
  if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) { e.preventDefault(); formatUnderline(); }
});

/* Funciones para Eventos y Tareas */
function getDateStr(d) {
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
}
function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function getNoteById(id) {
  return state.notes.find(function(n) { return n.id === id; });
}

function deleteReminder(noteId, uuid) {
  var note = getNoteById(noteId);
  if (!note) return;
  cancelReminderNotifications(noteId, uuid);
  var idx, arr;
  if (note.events) {
    idx = -1;
    note.events.forEach(function(e, i) { if (e.uuid === uuid) idx = i; });
    if (idx >= 0) {
      note.events.splice(idx, 1);
      save();
      renderNoteContent();
      return;
    }
  }
  if (note.tasks) {
    idx = -1;
    note.tasks.forEach(function(t, i) { if (t.uuid === uuid) idx = i; });
    if (idx >= 0) {
      note.tasks.splice(idx, 1);
      save();
      renderNoteContent();
    }
  }
}

function toggleTaskStatus(noteId, uuid) {
  var note = getNoteById(noteId);
  if (!note || !note.tasks) return;
  var task = null;
  note.tasks.forEach(function(t) { if (t.uuid === uuid) task = t; });
  if (!task) return;
  task.status = task.status === 'completed' ? 'pending' : 'completed';
  if (task.status === 'completed') {
    task.completedDate = getDateStr(new Date());
    cancelReminderNotifications(noteId, uuid);
  } else {
    task.completedDate = '';
  }
  save();
  renderNoteContent();
  if (task.status === 'pending') checkTodayNotifications();
}

function repetitionMatchesToday(element, today) {
  var created = new Date(element.createdAt);
  switch (element.repetition) {
    case 'none':
      return isSameDay(created, today);
    case 'weekly':
      return created.getDay() === today.getDay();
    case 'monthly':
      return created.getDate() === today.getDate();
    case 'yearly':
      return created.getMonth() === today.getMonth() && created.getDate() === today.getDate();
    default:
      return false;
  }
}
/* Hora del recordatorio ('HH:MM'), por defecto 09:00 */
function parseReminderTime(el) {
  var parts = (el.time || '09:00').split(':');
  var h = parseInt(parts[0], 10);
  var m = parseInt(parts[1], 10);
  return { h: Math.min(Math.max(h || 9, 0), 23), m: Math.min(Math.max(m || 0, 0), 59) };
}
function matchesReminderDay(el, d) {
  var created = new Date(el.createdAt);
  switch (el.repetition) {
    case 'weekly': return d.getDay() === created.getDay();
    case 'monthly': return d.getDate() === created.getDate();
    case 'yearly': return d.getMonth() === created.getMonth() && d.getDate() === created.getDate();
    case 'none':
    default:
      if (el.type === 'task') return true;
      return isSameDay(created, d);
  }
}
/* Próxima ocurrencia (Date) de un recordatorio, o null si no hay futura */
function nextReminderDate(el, now) {
  var t = parseReminderTime(el);
  var created = new Date(el.createdAt);
  if (el.type === 'event' && el.repetition === 'none') {
    var only = new Date(created.getFullYear(), created.getMonth(), created.getDate());
    only.setHours(t.h, t.m, 0, 0);
    return only.getTime() > now.getTime() ? only : null;
  }
  var startDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  for (var i = 0; i < 370; i++) {
    var cand = new Date(startDay.getTime() + i * 86400000);
    if (matchesReminderDay(el, cand)) {
      var d = new Date(cand);
      d.setHours(t.h, t.m, 0, 0);
      if (d.getTime() > now.getTime()) return d;
    }
  }
  return null;
}

function checkTodayNotifications() {
  if (typeof Capacitor !== 'undefined' && Capacitor.Plugins && Capacitor.Plugins.LocalNotifications) {
    Capacitor.Plugins.LocalNotifications.checkPermissions().then(function(perm) {
      if (perm.display === 'granted') {
        doCheckNotifications();
      } else {
        Capacitor.Plugins.LocalNotifications.requestPermissions().then(function(p) {
          if (p.display === 'granted') doCheckNotifications();
        }).catch(function() {});
      }
    }).catch(function() {});
  }
}

function doCheckNotifications() {
  var now = new Date();
  var notifications = [];

  function scheduleReminderIfNeeded(el, note, kind) {
    var next = nextReminderDate(el, now);
    if (!next) return;
    var nextTs = next.getTime();
    if (el._nextAt === nextTs) return;
    if (el._scheduledIds && el._scheduledIds.length && Capacitor.Plugins && Capacitor.Plugins.LocalNotifications) {
      Capacitor.Plugins.LocalNotifications.cancel({
        notifications: el._scheduledIds.map(function(id) { return { id: id }; })
      }).catch(function() {});
    }
    var id = _notifIdCounter++;
    notifications.push({
      id: id,
      title: kind + ': ' + el.title,
      body: note.title,
      schedule: { at: next, allowWhileIdle: true },
      data: { noteId: note.id, uuid: el.uuid }
    });
    el._scheduledIds = [id];
    el._nextAt = nextTs;
  }

  state.notes.forEach(function(note) {
    (note.events || []).forEach(function(ev) {
      scheduleReminderIfNeeded(ev, note, t('event'));
    });
    (note.tasks || []).forEach(function(tk) {
      if (tk.status !== 'pending') return;
      scheduleReminderIfNeeded(tk, note, t('task'));
    });
  });

  if (notifications.length > 0) {
    Capacitor.Plugins.LocalNotifications.schedule({
      notifications: notifications
    }).catch(function(err) {
      console.warn('Error scheduling notifications:', err);
    });
    save();
  }
}

function sendTestNotification() {
  if (typeof Capacitor === 'undefined' || !Capacitor.Plugins || !Capacitor.Plugins.LocalNotifications) {
    showToast(t('testNotifUnsupported'));
    return;
  }
  Capacitor.Plugins.LocalNotifications.checkPermissions().then(function(perm) {
    if (perm.display === 'granted') {
      scheduleTestNotification();
    } else {
      Capacitor.Plugins.LocalNotifications.requestPermissions().then(function(p) {
        if (p.display === 'granted') scheduleTestNotification();
        else showToast(t('testNotifDenied'));
      }).catch(function() {});
    }
  }).catch(function() {
    showToast(t('testNotifUnsupported'));
  });
}
function scheduleTestNotification() {
  var body = t('testNotifBody');
  Capacitor.Plugins.LocalNotifications.schedule({
    notifications: [{
      id: _notifIdCounter++,
      title: 'MiBabel',
      body: body,
      schedule: { at: new Date(Date.now() + 15000), allowWhileIdle: true },
      data: {}
    }]
  }).then(function() {
    showToast(t('testNotifSent'));
  }).catch(function(err) {
    console.warn('Error scheduling test notification:', err);
    showToast(t('testNotifDenied'));
  });
}

function openNoteById(noteId) {
  var note = state.notes.find(function(n) { return n.id === noteId; });
  if (!note) return;
  state.activeNoteId = noteId;
  state.view = note.diary ? 'diary' : 'notes';
  if (note.diary) {
    var parts = note.title.split('-');
    if (parts.length === 3) {
      var d = parseInt(parts[0], 10), m = parseInt(parts[1], 10) - 1, y = parseInt(parts[2], 10);
      _calMonth = m;
      _calYear = y;
      _calSelectedDay = { day: d, month: m, year: y };
    }
  }
  save();
  renderAll();
}

function cancelNoteNotifications(noteId) {
  var note = getNoteById(noteId);
  if (!note) return;
  var ids = [];
  (note.events || []).forEach(function(e) {
    if (e._scheduledIds) ids = ids.concat(e._scheduledIds);
    e._scheduledIds = [];
    e._nextAt = null;
  });
  (note.tasks || []).forEach(function(t) {
    if (t._scheduledIds) ids = ids.concat(t._scheduledIds);
    t._scheduledIds = [];
    t._nextAt = null;
  });
  if (ids.length > 0 && typeof Capacitor !== 'undefined' && Capacitor.Plugins && Capacitor.Plugins.LocalNotifications) {
    Capacitor.Plugins.LocalNotifications.cancel({
      notifications: ids.map(function(id) { return { id: id }; })
    }).catch(function() {});
  }
}

function cancelReminderNotifications(noteId, uuid) {
  var note = getNoteById(noteId);
  if (!note) return;
  var el = null;
  (note.events || []).forEach(function(e) { if (e.uuid === uuid) el = e; });
  if (!el) (note.tasks || []).forEach(function(t) { if (t.uuid === uuid) el = t; });
  if (!el) return;
  var ids = el._scheduledIds || [];
  el._scheduledIds = [];
  el._nextAt = null;
  if (ids.length > 0 && typeof Capacitor !== 'undefined' && Capacitor.Plugins && Capacitor.Plugins.LocalNotifications) {
    Capacitor.Plugins.LocalNotifications.cancel({
      notifications: ids.map(function(id) { return { id: id }; })
    }).catch(function() {});
  }
}

/* ===================== Hábitos ===================== */
var _editingHabitId = null;
var _habitDeleteId = null;
var _habitHoldTimer = null;
var _habitHoldInterval = null;
var _habitLongPressTimer = null;
var _habitLongPressTarget = null;

function getHabitByUuid(uuid){
  return (state.habits||[]).find(function(h){ return h.uuid===uuid; });
}

function getDateStrLocal(d){ return getDateStr(d); }

function processHabitsDayChange(){
  if(!state.habits) state.habits=[];
  var todayStr = getDateStr(new Date());
  var changed=false;
  function parseDateStr(s){ var p=s.split('-').map(Number); return new Date(p[0], p[1]-1, p[2]); }
  state.habits.forEach(function(h){
    if(!h.lastProcessedDate){
      h.lastProcessedDate = todayStr;
      changed=true;
      return;
    }
    if(h.lastProcessedDate === todayStr) return;
    var last = parseDateStr(h.lastProcessedDate);
    var today = parseDateStr(todayStr);
    var diffDays = Math.round((today - last)/86400000);
    if(diffDays<=0){ h.lastProcessedDate=todayStr; return; }
    var completedLastDay = h.lastCompletedDate === h.lastProcessedDate;
    if(!completedLastDay || diffDays>1){
      if(h.streak!==0){ h.streak=0; changed=true; }
    }
    if(h.status==='completed' || h.current!==0){
      h.status='pending';
      h.current=0;
      changed=true;
    }
    h.lastProcessedDate = todayStr;
  });
  if(changed){ save(); if(state.view==='habits') renderHabitsView(); checkHabitNotifications(); }
}

function onHabitTypeChange(){
  var type = document.getElementById('habitType').value;
  var cf = document.getElementById('habitCounterFields');
  if(cf) cf.style.display = type==='counter' ? 'block' : 'none';
}

function selectHabitIcon(icon){
  var el = document.getElementById('habitIcon');
  if(el) el.value = icon;
}

function selectHabitColor(color){
  var el = document.getElementById('habitColor');
  if(el) el.value = color;
}

function openHabitDialog(type){
  _editingHabitId = null;
  var dlgTitle = document.getElementById('habitDialogTitle');
  if(dlgTitle) dlgTitle.textContent = t('habitCreateTitle');
  var saveBtn = document.getElementById('habitSaveBtn');
  if(saveBtn) saveBtn.textContent = t('createHabit');
  document.getElementById('habitType').value = type||'task';
  document.getElementById('habitName').value = '';
  document.getElementById('habitDesc').value = '';
  document.getElementById('habitIcon').value = '';
  document.getElementById('habitColor').value = '#5b7db5';
  document.getElementById('habitTotal').value = '10';
  document.getElementById('habitStep').value = '1';
  var ne = document.getElementById('habitNameError');
  if(ne){ ne.style.display='none'; ne.textContent=''; }
  var ce = document.getElementById('habitCounterError');
  if(ce){ ce.style.display='none'; ce.textContent=''; }
  onHabitTypeChange();
  applyLang();
  showDialog('habitDialog');
  setTimeout(function(){ var i=document.getElementById('habitName'); if(i) i.focus(); },100);
}

function editHabit(uuid){
  var h = getHabitByUuid(uuid);
  if(!h) return;
  _editingHabitId = uuid;
  var dlgTitle = document.getElementById('habitDialogTitle');
  if(dlgTitle) dlgTitle.textContent = t('habitEditTitle');
  var saveBtn = document.getElementById('habitSaveBtn');
  if(saveBtn) saveBtn.textContent = t('save');
  document.getElementById('habitType').value = h.type;
  document.getElementById('habitName').value = h.name||'';
  document.getElementById('habitDesc').value = h.description||'';
  document.getElementById('habitIcon').value = h.icon||'';
  document.getElementById('habitColor').value = h.color||'#5b7db5';
  if(h.type==='counter'){
    document.getElementById('habitTotal').value = String(h.total);
    document.getElementById('habitStep').value = String(h.step);
  }
  var ne = document.getElementById('habitNameError');
  if(ne){ ne.style.display='none'; ne.textContent=''; }
  var ce = document.getElementById('habitCounterError');
  if(ce){ ce.style.display='none'; ce.textContent=''; }
  onHabitTypeChange();
  applyLang();
  hideContextMenu();
  showDialog('habitDialog');
}

function validateHabitForm(){
  var name = document.getElementById('habitName').value.trim();
  var type = document.getElementById('habitType').value;
  var ne = document.getElementById('habitNameError');
  var ce = document.getElementById('habitCounterError');
  if(ne){ ne.style.display='none'; ne.textContent=''; }
  if(ce){ ce.style.display='none'; ce.textContent=''; }
  if(!name){
    if(ne){ ne.textContent = t('habitNameRequired'); ne.style.display='block'; }
    document.getElementById('habitName').focus();
    return null;
  }
  var obj = { name:name, description: document.getElementById('habitDesc').value.trim(), icon: document.getElementById('habitIcon').value.trim(), color: document.getElementById('habitColor').value||'#5b7db5', type:type };
  if(type==='counter'){
    var total = parseInt(document.getElementById('habitTotal').value,10);
    var step = parseInt(document.getElementById('habitStep').value,10);
    if(isNaN(total) || total<=0){
      if(ce){ ce.textContent = t('habitTotalInvalid'); ce.style.display='block'; }
      return null;
    }
    if(isNaN(step) || step<=0 || step>total){
      if(ce){ ce.textContent = t('habitStepInvalid'); ce.style.display='block'; }
      return null;
    }
    if(total % step !== 0){
      if(ce){ ce.textContent = t('habitStepIncoherent'); ce.style.display='block'; }
      return null;
    }
    obj.total = total;
    obj.step = step;
  }
  return obj;
}

function saveHabit(){
  var data = validateHabitForm();
  if(!data) return;
  if(_editingHabitId){
    var h = getHabitByUuid(_editingHabitId);
    if(!h) return;
    h.name = data.name;
    h.description = data.description;
    h.icon = data.icon;
    h.color = data.color;
    // tipo no se cambia si ya tiene progreso? permitimos pero ajustamos
    if(h.type !== data.type){
      h.type = data.type;
      if(data.type==='counter'){ h.total=data.total; h.step=data.step; h.current=Math.min(h.current||0, h.total); }
      else { delete h.total; delete h.step; }
      // si cambia a task y estaba completado con counter, mantener completado lógica
    } else if(h.type==='counter'){
      var oldTotal = h.total;
      h.total = data.total;
      h.step = data.step;
      if(h.current > h.total) h.current = h.total;
      if(h.current===h.total && h.status==='pending'){ /* si ahora alcanza total, completar */ }
      if(h.status==='completed' && h.current < h.total) h.status='pending';
      if(h.current===h.total) { h.status='completed'; handleHabitCompleted(h); }
    }
  } else {
    var todayStr = getDateStr(new Date());
    var nh = {
      uuid: generateUUID(),
      name: data.name,
      description: data.description,
      icon: data.icon,
      color: data.color,
      type: data.type,
      current: 0,
      status: 'pending',
      streak: 0,
      lastCompletedDate: null,
      lastProcessedDate: todayStr,
      createdAt: Date.now(),
      history: []
    };
    if(data.type==='counter'){ nh.total=data.total; nh.step=data.step; }
    if(!state.habits) state.habits=[];
    state.habits.push(nh);
  }
  _editingHabitId=null;
  closeDialog('habitDialog');
  save();
  processHabitsDayChange();
  renderHabitsView();
  checkHabitNotifications();
}

function handleHabitCompleted(h){
  var todayStr = getDateStr(new Date());
  if(h.lastCompletedDate === todayStr) return; // ya contado hoy
  h.streak = (h.streak||0)+1;
  h.lastCompletedDate = todayStr;
  if(!h.history) h.history=[];
  h.history.push(todayStr);
}

function completeHabitTask(uuid){
  var h = getHabitByUuid(uuid);
  if(!h || h.type!=='task' || h.status==='completed') return;
  h.status='completed';
  handleHabitCompleted(h);
  save();
  renderHabitsView();
  checkHabitNotifications();
}

function incrementHabit(uuid, isAuto){
  var h = getHabitByUuid(uuid);
  if(!h || h.type!=='counter' || h.status==='completed') return;
  var next = h.current + h.step;
  if(next > h.total) return;
  // regla: auto-repeat debe detenerse a un salto del total
  if(isAuto && next===h.total) return;
  if(next===h.total){
    h.current = h.total;
    h.status='completed';
    handleHabitCompleted(h);
  } else {
    h.current = next;
  }
  save();
  renderHabitsView();
}

function decrementHabit(uuid){
  var h = getHabitByUuid(uuid);
  if(!h || h.type!=='counter' || h.status==='completed') return;
  var next = h.current - h.step;
  if(next < 0) next = 0;
  h.current = next;
  save();
  renderHabitsView();
}

function startHabitHold(uuid, dir){
  clearHabitHold();
  var isInc = dir==='inc';
  _habitHoldTimer = setTimeout(function(){
    _habitHoldInterval = setInterval(function(){
      if(isInc) incrementHabit(uuid, true);
      else decrementHabit(uuid);
    }, 150);
  }, 400);
}
function clearHabitHold(){
  if(_habitHoldTimer){ clearTimeout(_habitHoldTimer); _habitHoldTimer=null; }
  if(_habitHoldInterval){ clearInterval(_habitHoldInterval); _habitHoldInterval=null; }
}
document.addEventListener('mouseup', clearHabitHold);
document.addEventListener('touchend', clearHabitHold);
document.addEventListener('touchcancel', clearHabitHold);

function resetHabitToday(uuid){
  var h = getHabitByUuid(uuid);
  if(!h || h.status!=='completed') return;
  h.status='pending';
  h.current=0;
  // conservar streak y lastCompletedDate/history
  save();
  hideContextMenu();
  renderHabitsView();
  checkHabitNotifications();
}

function deleteHabit(uuid){
  _habitDeleteId = uuid;
  hideContextMenu();
  showDialog('habitDeleteDialog');
}
function confirmDeleteHabit(){
  if(!_habitDeleteId) return;
  var id=_habitDeleteId;
  _habitDeleteId=null;
  closeDialog('habitDeleteDialog');
  // cancelar notificaciones si hay
  cancelHabitNotifications(id);
  state.habits = (state.habits||[]).filter(function(h){ return h.uuid!==id; });
  save();
  renderHabitsView();
}

function renderHabitsView(){
  var container = document.getElementById('habitsContent');
  if(!container) return;
  processHabitsDayChange();
  var pending = (state.habits||[]).filter(function(h){ return h.status==='pending'; });
  var completed = (state.habits||[]).filter(function(h){ return h.status==='completed'; });
  var html='';
  html+='<div class="habits-header"><h2 style="font-size:18px;font-weight:600;color:var(--text);margin:0;">'+escapeHtml(t('habits'))+'</h2></div>';
  html+='<div class="habits-section"><div class="habits-section-title">'+escapeHtml(t('habitsPending'))+'</div>';
  if(pending.length===0){
    html+='<div class="habits-empty">'+escapeHtml(t('habitEmpty'))+'</div>';
  } else {
    pending.forEach(function(h){
      html+= renderHabitCard(h, false);
    });
  }
  html+='</div>';
  html+='<div class="habits-section"><div class="habits-section-title">'+escapeHtml(t('habitsCompleted'))+'</div>';
  if(completed.length===0){
    html+='<div class="habits-empty" style="opacity:0.5;">—</div>';
  } else {
    completed.forEach(function(h){
      html+= renderHabitCard(h, true);
    });
  }
  html+='</div>';
  container.innerHTML = html;
  updateBackBtn();
}

function renderHabitCard(h, isCompleted){
  var icon = h.icon ? escapeHtml(h.icon) : (h.type==='counter' ? '🔢' : '✅');
  var color = h.color || 'var(--accent)';
  var name = escapeHtml(h.name);
  var desc = h.description ? '<div class="habit-desc">'+escapeHtml(h.description)+'</div>' : '';
  var streak = isCompleted && h.streak>0 ? '<span class="habit-streak">🔥 '+h.streak+'</span>' : '';
  var progress = '';
  var controls = '';
  if(h.type==='counter' && !isCompleted){
    progress = '<div class="habit-progress">'+h.current+' / '+h.total+'</div>';
    var disInc = (h.current + h.step > h.total) ? ' disabled' : '';
    var disDec = (h.current===0) ? ' disabled' : '';
    controls = '<div class="habit-controls"><button class="habit-btn habit-dec"'+disDec+' onclick="decrementHabit(\''+h.uuid+'\')" onmousedown="startHabitHold(\''+h.uuid+'\',\'dec\')" ontouchstart="startHabitHold(\''+h.uuid+'\',\'dec\')" title="-">↓</button><button class="habit-btn habit-inc"'+disInc+' onclick="incrementHabit(\''+h.uuid+'\', false)" onmousedown="startHabitHold(\''+h.uuid+'\',\'inc\')" ontouchstart="startHabitHold(\''+h.uuid+'\',\'inc\')" title="+">↑</button></div>';
  } else if(h.type==='task' && !isCompleted){
    controls = '<div class="habit-controls"><button class="habit-btn habit-complete" onclick="completeHabitTask(\''+h.uuid+'\')" title="'+escapeHtml(t('completed'))+'">✓</button></div>';
  }
  var cls = isCompleted ? 'habit-card completed' : 'habit-card pending';
  var longPress = isCompleted ? ' onmousedown="startHabitLongPress(event,\''+h.uuid+'\')" ontouchstart="startHabitLongPress(event,\''+h.uuid+'\')" onmouseup="clearHabitLongPress()" ontouchend="clearHabitLongPress()" ontouchcancel="clearHabitLongPress()"' : '';
  return '<div class="'+cls+'" data-uuid="'+h.uuid+'"'+longPress+' style="border-left:4px solid '+escapeHtml(color)+'"><div class="habit-card-main"><span class="habit-icon">'+icon+'</span><div class="habit-info"><div class="habit-name">'+name+' '+streak+'</div>'+desc+progress+'</div>'+controls+'</div></div>';
}

function startHabitLongPress(e, uuid){
  clearHabitLongPress();
  _habitLongPressTarget = uuid;
  _habitLongPressTimer = setTimeout(function(){
    showHabitContextMenu(uuid, e);
  }, 600);
  // prevent context menu default
  // no preventDefault to allow click
}
function clearHabitLongPress(){
  if(_habitLongPressTimer){ clearTimeout(_habitLongPressTimer); _habitLongPressTimer=null; }
  _habitLongPressTarget=null;
}
function showHabitContextMenu(uuid, e){
  var h = getHabitByUuid(uuid);
  if(!h || h.status!=='completed') return;
  hideContextMenu();
  var items = [
    { label: t('resetToday'), action: function(){ resetHabitToday(uuid); } },
    { label: t('editHabit'), action: function(){ editHabit(uuid); } },
    { label: t('deleteHabit'), action: function(){ deleteHabit(uuid); } }
  ];
  var x = 20, y = 20;
  if(e){
    if(e.touches && e.touches[0]){ x = e.touches[0].clientX; y = e.touches[0].clientY; }
    else if(e.clientX){ x = e.clientX; y = e.clientY; }
    // clamp
    x = Math.min(window.innerWidth-160, Math.max(8, x));
    y = Math.min(window.innerHeight-120, Math.max(8, y));
  }
  showContextMenu(x, y, items);
  if(e) e.preventDefault();
}

/* === Registros (struct) UI === */
var _editingRegistroId = null;
var _deletingRegistroId = null;
var _registroEditFields = [];

function registroAddField() {
  _registroEditFields.push({ id: genId(), name: '', type: 'texto' });
  renderRegistroFieldsList();
}
function registroRemoveField(idx) {
  if (idx<0 || idx>=_registroEditFields.length) return;
  var fname = _registroEditFields[idx].name;
  if (fname && !confirm(t('confirmDeleteVariable') + ' "' + fname + '"?')) return;
  _registroEditFields.splice(idx,1);
  renderRegistroFieldsList();
}
function renderRegistroFieldsList() {
  var container = document.getElementById('registroFieldsList');
  if (!container) return;
  var html='';
  _registroEditFields.forEach(function(f, i){
    html+='<div class="registro-field-row" data-idx="'+i+'">';
    html+='<input type="text" placeholder="'+escapeHtml(t('variableName'))+'" value="'+escapeHtml(f.name)+'" oninput="_registroEditFields['+i+'].name=this.value.trim()" style="flex:1;" />';
    html+='<select onchange="_registroEditFields['+i+'].type=this.value">';
    _registroValidTypes.forEach(function(tp){
      html+='<option value="'+tp+'"'+(f.type===tp?' selected':'')+'>'+escapeHtml(t('type'+tp.charAt(0).toUpperCase()+tp.slice(1))||tp)+'</option>';
    });
    html+='</select>';
    html+='<button type="button" class="btn btn-sm btn-icon" onclick="registroRemoveField('+i+')" title="'+escapeHtml(t('deleteHabit'))+'">&times;</button>';
    html+='</div>';
  });
  container.innerHTML=html;
}
function validateRegistroForm() {
  var nameEl=document.getElementById('registroName');
  var name=nameEl ? nameEl.value.trim() : '';
  var nameErr=document.getElementById('registroNameError');
  var fieldsErr=document.getElementById('registroFieldsError');
  if (nameErr) { nameErr.style.display='none'; nameErr.textContent=''; }
  if (fieldsErr) { fieldsErr.style.display='none'; fieldsErr.textContent=''; }
  if (!name) {
    if (nameErr){ nameErr.textContent=t('registroNameRequired'); nameErr.style.display=''; }
    return null;
  }
  if (!isValidRegistroName(name)) {
    if (nameErr){ nameErr.textContent=t('invalidRegistroName'); nameErr.style.display=''; }
    return null;
  }
  if (!isRegistroNameUnique(name, _editingRegistroId)) {
    if (nameErr){ nameErr.textContent=t('registroExists'); nameErr.style.display=''; }
    return null;
  }
  if (_registroEditFields.length===0) {
    if (fieldsErr){ fieldsErr.textContent=t('variableNameRequired'); fieldsErr.style.display=''; }
    return null;
  }
  var seen={};
  var globalSeen={};
  // Build global seen excluding current registro fields (for edit)
  ensureRegistros();
  state.registros.forEach(function(r){
    if (_editingRegistroId && r.id===_editingRegistroId) return;
    r.fields.forEach(function(f){ globalSeen[f.name]=true; });
  });
  // Also diaryVariables
  if (state.diaryVariables) {
    for (var k in state.diaryVariables) if(Object.prototype.hasOwnProperty.call(state.diaryVariables,k)) globalSeen[k]=true;
  }
  for (var i=0;i<_registroEditFields.length;i++) {
    var f=_registroEditFields[i];
    if (!f.name) {
      if (fieldsErr){ fieldsErr.textContent=t('variableNameRequired') + ' ('+(i+1)+')'; fieldsErr.style.display=''; }
      return null;
    }
    if (!isValidVarName(f.name)) {
      if (fieldsErr){ fieldsErr.textContent=t('invalidRegistroName') + ': '+f.name; fieldsErr.style.display=''; }
      return null;
    }
    if (seen[f.name]) {
      if (fieldsErr){ fieldsErr.textContent=t('variableExists') + ': '+f.name; fieldsErr.style.display=''; }
      return null;
    }
    if (globalSeen[f.name]) {
      if (fieldsErr){ fieldsErr.textContent=t('variableExists') + ' (global): '+f.name; fieldsErr.style.display=''; }
      return null;
    }
    if (_registroValidTypes.indexOf(f.type)===-1) {
      if (fieldsErr){ fieldsErr.textContent=t('invalidType')+': '+f.type; fieldsErr.style.display=''; }
      return null;
    }
    seen[f.name]=true;
  }
  return { name:name, fields: _registroEditFields.map(function(f){ return { id:f.id, name:f.name, type:f.type }; }) };
}
function openRegistroDialog() {
  _editingRegistroId=null;
  _registroEditFields=[{id:genId(), name:'', type:'texto'}];
  document.getElementById('registroName').value='';
  document.getElementById('registroNameError').style.display='none';
  document.getElementById('registroFieldsError').style.display='none';
  document.getElementById('registroDialogTitle').textContent=t('registroCreateTitle');
  document.getElementById('registroSaveBtn').textContent=t('create');
  renderRegistroFieldsList();
  showDialog('registroDialog');
  setTimeout(function(){ var el=document.getElementById('registroName'); if(el) el.focus(); },100);
}
function editRegistro(id) {
  var r=getRegistroById(id);
  if(!r) return;
  _editingRegistroId=id;
  _registroEditFields = r.fields.map(function(f){ return { id:f.id, name:f.name, type:f.type }; });
  document.getElementById('registroName').value=r.name;
  document.getElementById('registroNameError').style.display='none';
  document.getElementById('registroFieldsError').style.display='none';
  document.getElementById('registroDialogTitle').textContent=t('registroEditTitle');
  document.getElementById('registroSaveBtn').textContent=t('save');
  renderRegistroFieldsList();
  hideContextMenu();
  showDialog('registroDialog');
}
function saveRegistro() {
  var data=validateRegistroForm();
  if(!data) return;
  ensureRegistros();
  if (_editingRegistroId) {
    var r=getRegistroById(_editingRegistroId);
    if(!r) return;
    var oldName=r.name;
    var oldFieldsMap={};
    r.fields.forEach(function(f){ oldFieldsMap[f.id]=f.name; });
    // Detect renamed registro
    var isRename = oldName!==data.name;
    // Build map old field name -> new name per id
    var fieldRenameMap={};
    // Keep track of fields that changed type
    var changedTypeFields={};
    // Determine deleted fields
    var oldFieldIds = r.fields.map(function(f){ return f.id; });
    var newFieldIds = data.fields.map(function(f){ return f.id; });
    var deletedFieldNames=[];
    r.fields.forEach(function(f){
      if (newFieldIds.indexOf(f.id)===-1) deletedFieldNames.push(f.name);
    });
    // Update fields
    r.fields = data.fields;
    // Handle rename registro references
    if (isRename) renameRegistroReferences(oldName, data.name);
    // Handle field renames and deletions
    data.fields.forEach(function(nf){
      var oldFieldName = oldFieldsMap[nf.id];
      if (oldFieldName && oldFieldName!==nf.name) {
        renameFieldReferences(data.name, oldFieldName, nf.name);
        fieldRenameMap[oldFieldName]=nf.name;
        // Also migrate entries: rename key in each date row
        for (var d in r.entries) if(Object.prototype.hasOwnProperty.call(r.entries,d)){
          if (r.entries[d][oldFieldName]!==undefined) {
            r.entries[d][nf.name]=r.entries[d][oldFieldName];
            delete r.entries[d][oldFieldName];
          }
        }
      }
      // Check type change: need to validate existing values
      var oldField = null;
      // Find old field object by id (need original list before overwrite? We have oldFieldsMap but not type)
      // For simplicity, if type changed, try to keep values that still validate, else delete
    });
    // For type changes, validate each entry
    // We need oldFields type map; reconstruct from previous r before update? We saved oldFieldsMap name only, not type.
    // So we need to capture oldFieldsById before
    // Instead, we already have r.fields updated, so we need to have stored old fields types earlier
    // Workaround: if type changed, entries for that field may become invalid; we clean below by re-validating all entries
    for (var d in r.entries) if(Object.prototype.hasOwnProperty.call(r.entries,d)){
      for (var fn in r.entries[d]) if(Object.prototype.hasOwnProperty.call(r.entries[d],fn)){
        var field = r.fields.find(function(f){ return f.name===fn; });
        if (!field) { delete r.entries[d][fn]; continue; }
        var v=r.entries[d][fn];
        // Validate type
        var valid = validateValueForType(String(v), field.type, typeof v==='string' && v.indexOf(' ')!==-1);
        // For bool, need special handling: v is boolean, String(v) is "true"/"false" which will validate
        if (valid===null) {
          // Try direct validation: if v is already typed (boolean/number), check type
          if (field.type==='int' && typeof v==='number' && Number.isInteger(v)) valid=v;
          else if (field.type==='float' && typeof v==='number') valid=v;
          else if (field.type==='bool' && typeof v==='boolean') valid=v;
          else if (field.type==='texto' && typeof v==='string') valid=v;
          else valid=null;
        }
        if (valid===null) delete r.entries[d][fn];
        else r.entries[d][fn]=valid;
      }
      if(Object.keys(r.entries[d]).length===0) delete r.entries[d];
    }
    // Handle deleted fields already: entries cleaned via type loop, but also ensure deletedFieldNames removed
    deletedFieldNames.forEach(function(fname){
      for (var d in r.entries) if(Object.prototype.hasOwnProperty.call(r.entries,d)){
        if (r.entries[d][fname]!==undefined) delete r.entries[d][fname];
        if(Object.keys(r.entries[d]).length===0) delete r.entries[d];
      }
    });
    r.name=data.name;
  } else {
    var newR={ id:genId(), name:data.name, fields:data.fields, entries:{}, createdAt:Date.now() };
    state.registros.push(newR);
  }
  closeDialog('registroDialog');
  _editingRegistroId=null;
  _registroEditFields=[];
  save();
  renderRegistrosView();
}
function deleteRegistro(id) {
  var r=getRegistroById(id);
  if(!r) return;
  _deletingRegistroId=id;
  document.getElementById('registroDeleteTitle').textContent=t('confirmDeleteRegistro') + ' "' + r.name + '"?';
  showDialog('registroDeleteDialog');
}
function confirmDeleteRegistro() {
  if(!_deletingRegistroId) return;
  var r=getRegistroById(_deletingRegistroId);
  if(!r) { closeDialog('registroDeleteDialog'); return; }
  // Push to trash for undo
  state.trash.push({ type:'registro', data: JSON.parse(JSON.stringify(r)), deletedAt: Date.now() });
  state.registros = state.registros.filter(function(x){ return x.id!==_deletingRegistroId; });
  if(state.activeRegistroId===_deletingRegistroId) state.activeRegistroId=null;
  closeDialog('registroDeleteDialog');
  _deletingRegistroId=null;
  save();
  renderRegistrosView();
  renderTrashContent();
}
function selectRegistro(id) {
  state.activeRegistroId=id;
  save();
  updateFab();
  renderRegistrosView();
}
function backToRegistros() {
  state.activeRegistroId=null;
  save();
  updateFab();
  renderRegistrosView();
}
function exportRegistro(id) {
  var r=getRegistroById(id);
  if(!r) return;
  exportItem(r, 'registro');
}
function setRegistroFilter() {
  var fromEl=document.getElementById('registroFilterFrom');
  var toEl=document.getElementById('registroFilterTo');
  var from=fromEl ? fromEl.value : null;
  var to=toEl ? toEl.value : null;
  // from/to are YYYY-MM-DD from input type=date
  // If one empty, set null
  if(from==='') from=null;
  if(to==='') to=null;
  state.registrosFilter={ from:from, to:to };
  save();
  renderRegistrosView();
}
function clearRegistroFilter() {
  state.registrosFilter={ from:null, to:null };
  var f=document.getElementById('registroFilterFrom'); if(f) f.value='';
  var t=document.getElementById('registroFilterTo'); if(t) t.value='';
  save();
  renderRegistrosView();
}
function renderRegistrosView() {
  var container=document.getElementById('registrosContent');
  if(!container) return;
  ensureRegistros();
  var active=getRegistroById(state.activeRegistroId);
  if (active) {
    // Detail view (header removido, título va en headerBackBtn)
    var html='<div class="registros-detail">';
    // Fields summary
    html+='<div class="habits-section" style="padding:10px;"><div class="habits-section-title">'+escapeHtml(t('variableType'))+'s</div>';
    if(active.fields.length===0) html+='<div class="habits-empty">'+escapeHtml(t('noRegistros'))+'</div>';
    else {
      active.fields.forEach(function(f){
        html+='<div style="display:flex;align-items:center;gap:8px;padding:4px 0;border-bottom:1px solid var(--border);"><span style="flex:1;font-size:13px;">'+escapeHtml(f.name)+' : '+escapeHtml(f.type)+'</span></div>';
      });
    }
    html+='</div>';
    // Filter
    var fromVal = state.registrosFilter && state.registrosFilter.from ? state.registrosFilter.from : '';
    var toVal = state.registrosFilter && state.registrosFilter.to ? state.registrosFilter.to : '';
    html+='<div class="registros-filter"><div class="field"><label style="font-size:11px;color:var(--text-muted);">'+escapeHtml(t('fromDate'))+'</label><input type="date" id="registroFilterFrom" value="'+fromVal+'" onchange="setRegistroFilter()" style="width:100%;" /></div><div class="field"><label style="font-size:11px;color:var(--text-muted);">'+escapeHtml(t('toDate'))+'</label><input type="date" id="registroFilterTo" value="'+toVal+'" onchange="setRegistroFilter()" style="width:100%;" /></div><button class="btn btn-sm" onclick="clearRegistroFilter()">'+escapeHtml(t('clearFilter'))+'</button></div>';
    // Table
    var filter=null;
    if(fromVal || toVal){
      var fStr='';
      if(fromVal && toVal) fStr=fromVal+':'+toVal;
      else if(fromVal) fStr=fromVal+':'+fromVal;
      else if(toVal) fStr=toVal+':'+toVal;
      filter=parseDateFilter(fStr);
      if(filter) filter.raw=fStr;
    }
    var dates=Object.keys(active.entries||{}).sort();
    var filtered=dates.filter(function(d){ return isDateInFilter(d, filter); });
    if (filtered.length===0) {
      html+='<div class="registros-empty" style="background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:20px;text-align:center;">'+escapeHtml(t('noRegistros'))+'</div>';
    } else {
      html+='<div class="registros-table-wrap"><table class="registros-table"><thead><tr><th class="col-fecha">Fecha</th>';
      active.fields.forEach(function(f){ html+='<th>'+escapeHtml(f.name)+' <span style="font-size:10px;opacity:0.6;">'+escapeHtml(f.type)+'</span></th>'; });
      html+='</tr></thead><tbody>';
      filtered.forEach(function(d){
        var row=active.entries[d];
        html+='<tr><td class="col-fecha">'+escapeHtml(formatDisplayDate(d))+'</td>';
        active.fields.forEach(function(f){
          var v=row[f.name];
          var disp = v!==undefined ? escapeHtml(formatRegistroValue(v,f.type)) : '<span style="opacity:0.3">—</span>';
          html+='<td>'+disp+'</td>';
        });
        html+='</tr>';
      });
      html+='</tbody></table></div>';
    }
    html+='</div>';
    container.innerHTML=html;
    updateBackBtn();
    return;
  }
  // List view (header removido)
  var html='';
  if(state.registros.length===0){
    html+='<div class="habits-empty">'+escapeHtml(t('registrosEmpty'))+'</div>';
  } else {
    state.registros.forEach(function(r){
      var varCount=r.fields.length;
      var entryCount=Object.keys(r.entries||{}).length;
      html+='<div class="registro-card" onclick="handleRegistroClick(event,'+r.id+')" onmousedown="startRegistroLongPress(event,'+r.id+')" ontouchstart="startRegistroLongPress(event,'+r.id+')" onmouseup="clearRegistroLongPress()" ontouchend="clearRegistroLongPress()" ontouchcancel="clearRegistroLongPress()" oncontextmenu="event.preventDefault(); showRegistroContextMenu('+r.id+',event); return false;">';
      html+='<div class="registro-card-title">'+escapeHtml(r.name)+'</div>';
      html+='<div class="registro-card-meta">'+varCount+' variables &middot; '+entryCount+' días</div>';
      html+='</div>';
    });
  }
  container.innerHTML=html;
  updateBackBtn();
}
var _registroLongPressTimer=null;
var _registroLongPressTarget=null;
var _registroLongPressFired=false;
function startRegistroLongPress(e, id){
  clearRegistroLongPress();
  _registroLongPressTarget=id;
  _registroLongPressTimer=setTimeout(function(){
    _registroLongPressFired=true;
    showRegistroContextMenu(id, e);
    setTimeout(function(){ _registroLongPressFired=false; }, 800);
  }, 600);
}
function clearRegistroLongPress(){
  if(_registroLongPressTimer){ clearTimeout(_registroLongPressTimer); _registroLongPressTimer=null; }
  _registroLongPressTarget=null;
}
function handleRegistroClick(e, id){
  if(_registroLongPressFired){ _registroLongPressFired=false; return; }
  if(_registroLongPressTarget!==null){ clearRegistroLongPress(); }
  selectRegistro(id);
}
function showRegistroContextMenu(id, e){
  var r=getRegistroById(id);
  if(!r) return;
  hideContextMenu();
  var items=[
    { label: t('edit'), action: function(){ editRegistro(id); } },
    { label: t('exportRegistro'), action: function(){ exportRegistro(id); } },
    { label: t('deleteRegistro'), action: function(){ deleteRegistro(id); } }
  ];
  var x=20, y=20;
  if(e){
    if(e.touches && e.touches[0]){ x=e.touches[0].clientX; y=e.touches[0].clientY; }
    else if(e.clientX){ x=e.clientX; y=e.clientY; }
    x=Math.min(window.innerWidth-160, Math.max(8, x));
    y=Math.min(window.innerHeight-120, Math.max(8, y));
  }
  showContextMenu(x, y, items);
  if(e) e.preventDefault();
}

/* Notificaciones Hábitos */
function checkHabitNotifications(){
  if(typeof Capacitor==='undefined' || !Capacitor.Plugins || !Capacitor.Plugins.LocalNotifications) return;
  Capacitor.Plugins.LocalNotifications.checkPermissions().then(function(perm){
    if(perm.display==='granted') doCheckHabitNotifications();
    else Capacitor.Plugins.LocalNotifications.requestPermissions().then(function(p){ if(p.display==='granted') doCheckHabitNotifications(); }).catch(function(){});
  }).catch(function(){});
}
function doCheckHabitNotifications(){
  if(!state.habits || state.habits.length===0) return;
  var pending = state.habits.filter(function(h){ return h.status==='pending'; });
  if(pending.length===0) return;
  // Cancelar anteriores hábito
  // Para simplificar, programar una notificación diaria agregada a las 09:00 si hay pendientes
  // Si ya existe _habitNotifIds, cancelar
  var now = new Date();
  var next = new Date(now);
  next.setHours(9,0,0,0);
  if(next.getTime() <= now.getTime()) next.setDate(next.getDate()+1);
  // usar un id fijo derivado para hábitos agregada
  var habitNotifId = 999999;
  // Cancelar previa si existe (usamos cancel con id fijo)
  if(window._habitNextAt === next.getTime()) return;
  if(typeof Capacitor!=='undefined' && Capacitor.Plugins && Capacitor.Plugins.LocalNotifications){
    Capacitor.Plugins.LocalNotifications.cancel({ notifications:[{id:habitNotifId}] }).catch(function(){});
    var title = t('habits');
    var body = pending.length===1 ? pending[0].name : pending.length + ' ' + t('habitsPending').toLowerCase();
    Capacitor.Plugins.LocalNotifications.schedule({
      notifications: [{
        id: habitNotifId,
        title: title + ' - ' + t('habitsPending'),
        body: body,
        schedule: { at: next, allowWhileIdle:true },
        data: { habitReminder:true }
      }]
    }).catch(function(err){ console.warn('habit notif error',err); });
    window._habitNextAt = next.getTime();
  }
}
function cancelHabitNotifications(uuid){
  // por ahora solo notificación agregada, no per-hábito. Si per-hábito, cancelar por uuid
  // placeholder para futuro per-hábito ids
  if(typeof Capacitor!=='undefined' && Capacitor.Plugins && Capacitor.Plugins.LocalNotifications){
    // cancelar agregada si se elimina último pendiente
    var pending = (state.habits||[]).filter(function(h){ return h.status==='pending' && h.uuid!==uuid; });
    if(pending.length===0){
      Capacitor.Plugins.LocalNotifications.cancel({ notifications:[{id:999999}] }).catch(function(){});
      window._habitNextAt=null;
    }
  }
}



/* Registrar listener para apertura desde notificaciones */
if (typeof Capacitor !== 'undefined' && Capacitor.Plugins && Capacitor.Plugins.LocalNotifications) {
  Capacitor.Plugins.LocalNotifications.addListener(
    'localNotificationActionPerformed', function(notification) {
      var noteId = notification.notification.data.noteId;
      if (noteId) openNoteById(noteId);
    }
  );
}

/* paste detection for lists */
document.addEventListener('paste', function(e) {
  var el = e.target;
  if (!el || !el.classList || !el.classList.contains('item-text') || !el.isContentEditable) return;
  if (!state.activeNoteId) return;
  var text = (e.clipboardData || window.clipboardData).getData('text/plain');
  if (!text) return;
  var lines = text.split('\n').filter(function(l) { return l.trim().length > 0; });
  if (lines.length < 2) return;
  e.preventDefault();
  var note = state.notes.find(function(n) { return n.id === state.activeNoteId; });
  if (!note) return;
  var idx = -1;
  note.items.forEach(function(item, i) { if (item.id === activeItemId) idx = i; });
  if (idx < 0) return;
  var itemType = note.items[idx].type === 'text' ? 'text' : 'list';
  var cleaned = lines.map(function(l) {
    return l.replace(/^[-*+]\s+/, '').replace(/^\d+[.)]\s+/, '').replace(/^\[[ x]\]\s+/, '').trim();
  });
  note.items[idx].text = cleaned[0];
  for (var i = 1; i < cleaned.length; i++) {
    note.items.splice(idx + i, 0, { id: genId(), text: cleaned[i], checked: false, level: 0, type: itemType });
  }
  save();
  renderNoteContent();
  var newIdx = idx + cleaned.length - 1;
  var domItems = document.querySelectorAll('.list-item .item-text[contenteditable]');
  if (domItems.length > newIdx) { domItems[newIdx].focus(); placeCaretAtEnd(domItems[newIdx]); }
});

/* Week start */
function setWeekStart(val) {
  state.weekStartsMonday = (val === 'monday');
  save();
  renderCalendarGrid();
}

/* Default board bg */
function setDefaultBoardBg(val) {
  state.defaultBoardBg = val;
  state.boards.forEach(function(b) { b.boardBg = val; });
  save();
  if (state.activeBoardId) renderBoardContent();
}

/* Board shadows toggle */
function toggleBoardShadows() {
  state.boardShowShadows = !state.boardShowShadows;
  save();
  updateSettingsToggleStates();
  var board = state.boards.find(function(b) { return b.id === state.activeBoardId; });
  if (board) renderBoardContent();
}

/* Board animations toggle */
function toggleBoardAnimations() {
  state.boardShowAnimations = !state.boardShowAnimations;
  save();
  updateSettingsToggleStates();
  var board = state.boards.find(function(b) { return b.id === state.activeBoardId; });
  if (board) renderBoardContent();
}

/* Update toggle visual states in settings */
function updateSettingsToggleStates() {
  // Shadows toggle
  var st = document.getElementById('boardShadowsToggle');
  if (st) st.classList.toggle('active', state.boardShowShadows !== false);
  // Animations toggle
  var at = document.getElementById('boardAnimationsToggle');
  if (at) at.classList.toggle('active', state.boardShowAnimations !== false);
  // Week start select
  var ws = document.getElementById('weekStartSelect');
  if (ws) ws.value = state.weekStartsMonday ? 'monday' : 'sunday';
  // Default board bg buttons
  var bgBtns = document.getElementById('boardBgBtns');
  if (bgBtns) {
    var btns = bgBtns.querySelectorAll('.bg-btn');
    var currentBg = state.defaultBoardBg || 'cork';
    for (var i = 0; i < btns.length; i++) { btns[i].classList.toggle('active', btns[i].getAttribute('data-bg') === currentBg); }
  }
}

/* Stats */
function showStatsDialog() {
  var content = document.getElementById('statsContent');
  if (!content) return;
  var totalNotes = state.notes ? state.notes.length : 0;
  var totalBoards = state.boards ? state.boards.length : 0;
  var totalStudySets = state.studySets ? state.studySets.length : 0;
  var totalPostits = 0;
  if (state.boards) state.boards.forEach(function(b) { totalPostits += (b.postits ? b.postits.length : 0) + ((b.elements && b.elements.length) || 0); });
  var totalReminders = 0;
  if (state.notes) state.notes.forEach(function(n) { totalReminders += ((n.events ? n.events.length : 0) + (n.tasks ? n.tasks.length : 0)); });
  var totalHabits = state.habits ? state.habits.length : 0;
  var totalRegistros = state.registros ? state.registros.length : 0;
  var totalWords = 0;
  if (state.notes) state.notes.forEach(function(n) {
    if (n.items) n.items.forEach(function(item) { if (item.text) totalWords += item.text.split(/\s+/).filter(function(w) { return w.length > 0; }).length; });
    if (n.title) totalWords += n.title.split(/\s+/).filter(function(w) { return w.length > 0; }).length;
  });
  content.innerHTML =
    '<div class="stats-row"><span class="stats-label">' + t('totalNotes') + '</span><span class="stats-value">' + totalNotes + '</span></div>' +
    '<div class="stats-row"><span class="stats-label">' + t('totalBoards') + '</span><span class="stats-value">' + totalBoards + '</span></div>' +
    '<div class="stats-row"><span class="stats-label">' + t('totalStudySets') + '</span><span class="stats-value">' + totalStudySets + '</span></div>' +
    '<div class="stats-row"><span class="stats-label">' + t('totalPostits') + '</span><span class="stats-value">' + totalPostits + '</span></div>' +
    '<div class="stats-row"><span class="stats-label">' + t('totalReminders') + '</span><span class="stats-value">' + totalReminders + '</span></div>' +
    '<div class="stats-row"><span class="stats-label">' + t('habits') + '</span><span class="stats-value">' + totalHabits + '</span></div>' +
    '<div class="stats-row"><span class="stats-label">' + t('totalRegistros') + '</span><span class="stats-value">' + totalRegistros + '</span></div>' +
    '<div class="stats-row"><span class="stats-label">' + t('totalWords') + '</span><span class="stats-value">' + totalWords + '</span></div>';
  showDialog('statsDialog');
}

/* About */
function showAboutDialog() {
  var content = document.getElementById('aboutContent');
  if (!content) return;
  var html = '';
  html += '<div class="about-section"><h4>' + t('versionLabel') + '</h4><div>1.0.0</div></div>';
  html += '<div class="about-section"><h4>' + t('developer') + '</h4><div>AKSK Software</div></div>';
  html += '<div class="about-section"><h4>' + t('contact') + '</h4><div><a href="mailto:aksksoftware@gmail.com">aksksoftware@gmail.com</a></div></div>';
  html += '<div class="about-section"><h4>' + t('licenses') + '</h4>' +
    '<div class="about-license-item"><span class="about-license-name">@capacitor/core</span> <span class="about-license-text">MIT</span></div>' +
    '<div class="about-license-item"><span class="about-license-name">@capacitor/filesystem</span> <span class="about-license-text">MIT</span></div>' +
    '<div class="about-license-item"><span class="about-license-name">@capacitor/local-notifications</span> <span class="about-license-text">MIT</span></div>' +
    '<div class="about-license-item"><span class="about-license-name">KaTeX</span> <span class="about-license-text">MIT</span></div>' +
    '<div class="about-license-item"><span class="about-license-name">pdf-lib</span> <span class="about-license-text">MIT</span></div>' +
    '<div class="about-license-item"><span class="about-license-name">docx</span> <span class="about-license-text">MIT</span></div>' +
    '<div class="about-license-item"><span class="about-license-name">JSZip</span> <span class="about-license-text">MIT</span></div>' +
    '<div class="about-license-item"><span class="about-license-name">fontkit</span> <span class="about-license-text">MIT</span></div>' +
    '<div class="about-license-item"><span class="about-license-name">Noto Sans</span> <span class="about-license-text">SIL OFL 1.1</span></div>' +
    '</div>';
  html += '<div class="about-section"><h4>' + t('privacy') + '</h4><div>All data is stored locally in your device. No data is sent to any server. MiBabel does not collect, share, or sell any personal information.</div></div>';
  content.innerHTML = html;
  showDialog('aboutDialog');
}

document.addEventListener('mouseup', function() {
  setTimeout(updateFmtBar, 10);
});
document.addEventListener('keyup', function() {
  setTimeout(updateFmtBar, 10);
});
