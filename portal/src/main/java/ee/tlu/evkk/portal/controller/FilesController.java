package ee.tlu.evkk.portal.controller;

import ee.tlu.evkk.dal.dao.UserAccountFileDao;
import ee.tlu.evkk.dal.dto.UserAccountFileView;
import ee.tlu.evkk.portal.security.AuthenticatedUser;
import ee.tlu.evkk.portal.service.UserAccountFileService;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;
import java.util.List;
import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 2019-02-14
 */
@Controller
@RequestMapping("/files")
public class FilesController {

    @Autowired
    private UserAccountFileDao userAccountFileDao;
    @Autowired
    private UserAccountFileService userAccountFileService;

    @GetMapping
    @Transactional(readOnly = true)
    public String getFiles(@AuthenticationPrincipal AuthenticatedUser user, Model model) {
        UUID userAccountId = user.getUserAccountId();
        List<UserAccountFileView> files = userAccountFileDao.getViewByUserAccountId(userAccountId);
        model.addAttribute("files", files);
        return "files";
    }

    @GetMapping("/{fileId}")
    @Transactional(readOnly = true)
    public ResponseEntity<Resource> getFile(@AuthenticationPrincipal AuthenticatedUser user, @PathVariable("fileId") UUID fileId) throws SQLException, IOException {
        UUID userAccountId = user.getUserAccountId();
        return userAccountFileService.getFile(userAccountId, fileId);
    }

    @PostMapping
    @Transactional
    public String postFile(@AuthenticationPrincipal AuthenticatedUser user, @RequestParam("file") MultipartFile file) throws IOException, SQLException {
        UUID userAccountId = user.getUserAccountId();
        InputStream inputStream = file.getInputStream();
        String name = FilenameUtils.getName(file.getOriginalFilename());
        String contentType = file.getContentType();

        userAccountFileService.insert(userAccountId, inputStream, name, contentType);
        return "redirect:/files";
    }

}