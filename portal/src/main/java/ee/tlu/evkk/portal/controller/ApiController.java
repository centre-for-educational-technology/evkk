package ee.tlu.evkk.portal.controller;

import ee.tlu.evkk.dal.dao.UserAccountFileDao;
import ee.tlu.evkk.dal.dto.UserAccountFileView;
import ee.tlu.evkk.portal.service.UserAccountFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.UUID;

/**
 * @author Mikk Tarvas
 * Date: 2019-02-18
 */
@RestController
@RequestMapping("/api")
public class ApiController {

    //TODO: authenticate via secret

    //@Autowired
    //private PortalMapper portalMapper;
    @Autowired
    private UserAccountFileDao userAccountFileDao;
    @Autowired
    private UserAccountFileService userAccountFileService;

    @Transactional(readOnly = true)
    @GetMapping("/user-account/{userAccountId}/file/list")
    public List<UserAccountFileView> getUserAccountFiles(@PathVariable("userAccountId") UUID userAccountId) {
        List<UserAccountFileView> files = userAccountFileDao.getViewByUserAccountId(userAccountId);
        return files;
    }

    @Transactional(readOnly = true)
    @GetMapping("/user-account/{userAccountId}/file/{fileId}")
    public ResponseEntity<Resource> getUserAccountFile(@PathVariable("userAccountId") UUID userAccountId, @PathVariable("fileId") UUID fileId)
            throws IOException, SQLException {
        return userAccountFileService.getFile(userAccountId, fileId);
    }

}